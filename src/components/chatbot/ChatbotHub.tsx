import React, { useState, useRef, useEffect } from 'react';
import { 
  BotMessageSquare, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Lightbulb, 
  Copy, 
  Check, 
  RefreshCw,
  Key
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AiAssistantService } from '../../services/aiAssistantService';
import { ChatMessage } from '../../types';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'assistant',
    text: `Hello! I'm **Nexora AI**, your personal placement preparation mentor and tech career coach. 🎓

I can help you with:
- **STAR Behavioral Stories**: Turn your projects into compelling behavioral interview answers.
- **Company Specific Playbooks**: Crack rounds at **Google, Amazon, Microsoft, TCS, Goldman Sachs**, and startups.
- **DSA Intuition & Hints**: Understand complex algorithmic patterns (DP, Graphs, Trees) without spoiling solutions.
- **Resume & ATS Optimization**: Action verbs, Google XYZ formula, and quantified bullet points.
- **HR & Salary Negotiations**: Understanding CTC breakdowns, base salary, and handling tricky questions.

How can I help accelerate your placement prep today?`,
    timestamp: 'Just now',
    suggestedFollowUps: [
      'Explain the STAR method with an example',
      'Give me Google SDE-1 interview tips',
      'What is Amazon Customer Obsession?',
      'How do I negotiate salary as a fresher?'
    ]
  }
];

export const ChatbotHub: React.FC = () => {
  const { userState } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputQuery).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    try {
      const response = await AiAssistantService.answerChatQuery(text, userState.geminiApiKey);
      const botMsg: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: response.followUps
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      console.warn('Chat error:', e);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-brand-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-cyber-cyan p-0.5 shadow-lg shadow-brand-500/25">
            <div className="w-full h-full bg-[#0E1524] rounded-[14px] flex items-center justify-center">
              <Bot className="w-6 h-6 text-brand-300" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
              Nexora AI Career Mentor
              <span className="text-[10px] font-bold text-cyber-cyan bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                {userState.geminiApiKey ? 'Gemini 1.5 Live' : 'Placement Engine'}
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              24/7 dedicated advice for technical rounds, HR questions, algorithms & negotiations.
            </p>
          </div>
        </div>

        {/* Quick prompt chips */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          <span>Active Placement Coach</span>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="glass-panel rounded-3xl border border-slate-800 flex flex-col h-[650px] overflow-hidden">
        
        {/* Messages Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map(msg => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-3.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-brand-600/30 text-brand-300 border border-brand-500/40 flex-shrink-0 flex items-center justify-center mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-2.5 ${isUser ? 'items-end' : 'items-start'}`}>
                  
                  {/* Bubble Surface */}
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed relative group ${
                      isUser
                        ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white rounded-br-none shadow-md shadow-brand-500/20'
                        : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-bl-none'
                    }`}
                  >
                    {/* Copy button */}
                    {!isUser && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-white rounded transition"
                        title="Copy message"
                      >
                        {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    )}

                    <div className="whitespace-pre-line space-y-2">
                      {msg.text}
                    </div>

                    <div className={`text-[10px] mt-2 ${isUser ? 'text-brand-200/80' : 'text-slate-500'} text-right`}>
                      {msg.timestamp}
                    </div>
                  </div>

                  {/* Suggested Follow-Ups Pills */}
                  {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestedFollowUps.map((pill, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(pill)}
                          className="text-[11px] px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-brand-600 hover:text-white text-slate-300 border border-slate-700/80 transition flex items-center gap-1"
                        >
                          <Lightbulb className="w-3 h-3 text-amber-400" />
                          <span>{pill}</span>
                        </button>
                      ))}
                    </div>
                  )}

                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 flex-shrink-0 flex items-center justify-center mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 items-center text-xs text-brand-300 animate-pulse pl-1">
              <Bot className="w-4 h-4 text-cyber-cyan" />
              <span>Nexora AI is formulating guidance...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/60">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={e => setInputQuery(e.target.value)}
              placeholder="Ask anything about placement preparation, STAR answers, company patterns, or DSA..."
              className="flex-1 glass-input px-4 py-3 rounded-2xl text-xs sm:text-sm"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-cyber-cyan text-white text-xs font-bold shadow-lg shadow-brand-500/25 hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
