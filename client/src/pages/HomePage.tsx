import { Youtube, Sparkles, MousePointer2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function HomePage() {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (url) navigate(`/dashboard?url=${encodeURIComponent(url)}`);
  };

  return (
    <div className="pt-16 sm:pt-20 px-3 sm:px-6">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto text-center py-12 sm:py-20">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-4 sm:mb-6 leading-tight">
          Unlock Your <span className="text-neon-green">Content Gold</span> <br className="hidden sm:block" /> 
          <span className="sm:hidden">with Previda.</span>
          <span className="hidden sm:inline">with Previda.</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
          Transform messy YouTube comments into actionable, viral video ideas using AI.
        </p>

        <div className="relative max-w-3xl mx-auto group">
          <div className="absolute -inset-1 bg-neon-green rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative flex flex-col md:flex-row gap-3 sm:gap-4 glass p-3 sm:p-4 rounded-xl border-2 border-white/20">
            <div className="grow flex items-center px-3 sm:px-4 bg-black/20 rounded-lg">
              <Youtube className="text-red-500 mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Paste YouTube Video URL..." 
                className="w-full py-3 sm:py-4 bg-transparent outline-none text-sm sm:text-lg"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button 
              onClick={handleAnalyze}
              className="neo-btn bg-electric-purple px-6 sm:px-10 py-3 sm:py-4 rounded-lg font-black text-base sm:text-xl shadow-neo flex items-center justify-center gap-2"
            >
              ANALYZE <Sparkles size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Bento How It Works */}
      <section className="max-w-6xl mx-auto py-12 sm:py-20 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="glass p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-2 border-neon-green/30 shadow-neo-green">
          <div className="bg-neon-green/20 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
            <Youtube className="text-neon-green w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4 uppercase">1. Paste URL</h3>
          <p className="text-gray-400 text-sm sm:text-base">Drop your video link. Our engine scrapes every single meaningful comment thread.</p>
        </div>
        
        <div className="glass p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-2 border-electric-purple/30 shadow-neo-purple">
          <div className="bg-electric-purple/20 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
            <Sparkles className="text-electric-purple w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4 uppercase">2. AI Analysis</h3>
          <p className="text-gray-400 text-sm sm:text-base">Our Llama-3 brain processes sentiment, pain points, and recurring questions.</p>
        </div>

        <div className="glass p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-2 border-white/10 shadow-neo">
          <div className="bg-white/10 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
            <MousePointer2 className="text-white w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4 uppercase">3. Get Ideas</h3>
          <p className="text-gray-400 text-sm sm:text-base">Receive formatted content blueprints ready for your script or Notion board.</p>
        </div>
      </section>
    </div>
  );
}