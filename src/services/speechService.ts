// Web Speech API wrapper for AI Interviewer Voice & Recognition

export interface SpeechRecognitionHandlers {
  onResult: (transcript: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
}

export class SpeechService {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static recognition: any = null;
  private static isSpeaking: boolean = false;

  // Check speech synthesis support
  public static isSpeechSynthesisSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  // Check speech recognition support
  public static isSpeechRecognitionSupported(): boolean {
    return typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
  }

  // Speak text aloud
  public static speak(text: string, onEnd?: () => void): void {
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }

    // Cancel any previous speech
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Pick a natural English voice if available
    const voices = this.synth.getVoices();
    const naturalVoice = voices.find(v => (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('David')) && v.lang.startsWith('en'))
      || voices.find(v => v.lang.startsWith('en'));
    
    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  public static stopSpeaking(): void {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }

  public static getIsSpeaking(): boolean {
    return this.synth ? this.synth.speaking : false;
  }

  // Start speech to text recognition
  public static startListening(handlers: SpeechRecognitionHandlers): any {
    if (!this.isSpeechRecognitionSupported()) {
      if (handlers.onError) {
        handlers.onError('Speech Recognition is not supported in this browser. Please use Chrome/Edge or type your response.');
      }
      return null;
    }

    try {
      const SpeechRecognitionConstructor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognitionConstructor();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const text = finalTranscript || interimTranscript;
        handlers.onResult(text, Boolean(finalTranscript));
      };

      recognition.onerror = (event: any) => {
        if (event.error !== 'no-speech' && handlers.onError) {
          handlers.onError(event.error);
        }
      };

      recognition.onend = () => {
        if (handlers.onEnd) {
          handlers.onEnd();
        }
      };

      recognition.start();
      this.recognition = recognition;
      return recognition;
    } catch (err: any) {
      if (handlers.onError) {
        handlers.onError(err.message || 'Failed to initialize microphone');
      }
      return null;
    }
  }

  public static stopListening(): void {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore if already stopped
      }
      this.recognition = null;
    }
  }
}
