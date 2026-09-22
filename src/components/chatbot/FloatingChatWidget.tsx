import React, { useState, useRef, useEffect } from 'react';
import { 
  BotMessageSquare, 
  X, 
  Send, 
  Bot, 
  Sparkles, 
  ChevronDown, 
  Minimize2 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AiAssistantService } from '../../services/aiAssistantService';

export const FloatingChatWidget: React.FC = () => {
  const { userState } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([
    { sender: 'bot', text: 'Hi! Need quick placement help or a hint? Ask me anything!' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim();
    if (!query) return;

    setMessages(prev => [...prev, { sender: 'user', text: query }]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await AiAssistantService.answerChatQuery(query, userState.geminiApiKey);
      setMessages(prev => [...prev, { sender: 'bot', text: res.text }]);
    } catch (err) {
      // ignore
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-4 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-cyber-cyan text-white shadow-2xl shadow-brand-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5"
          title="Open Nexora AI Quick Assistant"
        >
          <div className="relative">
            <BotMessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyber-emerald rounded-full ring-2 ring-brand-700 animate-pulse" />
          </div>
          <span className="text-xs font-extrabold hidden sm:inline tracking-tight pr-1">
            Nexora AI
          </span>
        </button>
      )}

      {/* Floating Chat Drawer Box */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] rounded-3xl glass-panel-glow border border-brand-500/40 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-600/30 text-brand-300 border border-brand-500/30 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  Nexora Quick Assistant
                  <Sparkles className="w-3 h-3 text-cyber-cyan" />
                </h4>
                <span className="text-[10px] text-slate-400">Online & Ready to Help</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] whitespace-pre-line ${
                    m.sender === 'user'
                      ? 'bg-brand-600 text-white rounded-br-none'
                      : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700/60'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="text-[11px] text-brand-300 animate-pulse flex items-center gap-1">
                <Bot className="w-3 h-3" /> Thinking...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 bg-slate-900/90 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask for hints, STAR tips, or advice..."
              className="flex-1 glass-input px-3 py-2 rounded-xl text-xs"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 bg-brand-600 hover:bg-brand-500 disabled:opacity-40 text-white rounded-xl transition"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};
