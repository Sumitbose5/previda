import { useState } from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { showSuccessToast, toastMessages } from '../utils/toastConfig';

export default function SettingsPage() {
  const [provider, setProvider] = useState(localStorage.getItem('previda_provider') || 'groq');
  const [key, setKey] = useState(localStorage.getItem('previda_api_key') || '');

  const saveSettings = () => {
    localStorage.setItem('previda_provider', provider);
    localStorage.setItem('previda_api_key', key);
    showSuccessToast(toastMessages.settingsSaved);
  };

  return (
    <div className="pt-20 sm:pt-32 px-3 sm:px-6 max-w-2xl mx-auto">
      <div className="glass p-6 sm:p-10 rounded-2xl sm:rounded-3xl border-2 border-white/10 shadow-neo">
        <h1 className="text-2xl sm:text-4xl font-black mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
          <ShieldCheck className="text-neon-green w-6 h-6 sm:w-8 sm:h-8" /> 
          <span>API CONFIG</span>
        </h1>

        <div className="mb-6 sm:mb-8">
          <label className="block text-xs sm:text-sm font-bold uppercase mb-3 sm:mb-4 opacity-50">Choose Brain</label>
          <div className="flex p-1 bg-black/40 rounded-xl border border-white/10">
            <button 
              onClick={() => setProvider('groq')}
              className={`flex-1 py-2 sm:py-3 rounded-lg font-black transition-all text-sm sm:text-base ${provider === 'groq' ? 'bg-electric-purple shadow-neo text-white' : 'opacity-40'}`}
            >
              <span className="hidden sm:inline">GROQ (Fast/Free)</span>
              <span className="sm:hidden">GROQ</span>
            </button>
            <button 
              onClick={() => setProvider('openai')}
              className={`flex-1 py-2 sm:py-3 rounded-lg font-black transition-all text-sm sm:text-base ${provider === 'openai' ? 'bg-electric-purple shadow-neo text-white' : 'opacity-40'}`}
            >
              <span className="hidden sm:inline">OPENAI (Smart)</span>
              <span className="sm:hidden">OPENAI</span>
            </button>
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <label className="block text-xs sm:text-sm font-bold uppercase mb-2 opacity-50">
            {provider.toUpperCase()} API KEY
          </label>
          <input 
            type="password"
            className="w-full glass p-3 sm:p-4 rounded-xl outline-none focus:border-neon-green text-sm sm:text-base"
            placeholder="sk-..."
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>

        <div className="bg-neon-green/10 p-3 sm:p-4 rounded-xl border border-neon-green/20 mb-6 sm:mb-8 flex gap-2 sm:gap-3 text-xs sm:text-sm text-neon-green/80">
          <Info size={20} className="sm:w-10 sm:h-10 flex-shrink-0" />
          <p>Your keys are stored <strong>locally in your browser</strong>. We never see them. You are in total control of your costs.</p>
        </div>

        <button 
          onClick={saveSettings}
          className="w-full neo-btn bg-neon-green text-black font-black py-3 sm:py-4 rounded-xl shadow-neo text-lg sm:text-xl"
        >
          SAVE CONFIGURATION
        </button>
      </div>
    </div>
  );
}