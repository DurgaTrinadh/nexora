import React, { useState } from 'react';
import { X, Sparkles, Key, Target, Building2, User, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { userState, updateUserState } = useApp();

  const [name, setName] = useState(userState.name);
  const [targetRole, setTargetRole] = useState(userState.targetRole);
  const [dreamCompany, setDreamCompany] = useState(userState.dreamCompany);
  const [apiKey, setApiKey] = useState(userState.geminiApiKey || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserState(prev => ({
      ...prev,
      name,
      targetRole,
      dreamCompany,
      geminiApiKey: apiKey.trim()
    }));
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg glass-panel rounded-2xl p-6 border border-slate-700/60 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-cyber-cyan flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Profile & AI Preferences</h2>
            <p className="text-xs text-slate-400">Customize your placement goals and optional Gemini key</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-brand-400" /> Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Alex Rivera"
              className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-cyber-cyan" /> Target Role
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={e => setTargetRole(e.target.value)}
              placeholder="e.g. Software Development Engineer (SDE-1)"
              className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-cyber-emerald" /> Dream Company
            </label>
            <input
              type="text"
              value={dreamCompany}
              onChange={e => setDreamCompany(e.target.value)}
              placeholder="e.g. Google, Amazon, Microsoft, TCS"
              className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
              required
            />
          </div>

          <div className="pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-400" /> Google Gemini API Key
              </label>
              <span className="text-[11px] text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded-full border border-brand-500/20">
                Optional
              </span>
            </div>
            <input
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="AIzaSy... (Leave empty to use built-in engine)"
              className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
            />
            <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
              Nexora works 100% out-of-the-box with intelligent built-in heuristics! Add a free key from Google AI Studio only if you want live dynamic LLM responses.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-300 hover:text-white rounded-xl hover:bg-slate-800/80 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={savedSuccess}
              className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-brand-600 to-cyber-cyan text-white shadow-lg shadow-brand-500/25 hover:opacity-95 transition flex items-center gap-2"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" /> Saved!
                </>
              ) : (
                'Save Preferences'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
