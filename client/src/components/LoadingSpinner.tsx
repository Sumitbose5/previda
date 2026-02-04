import { Sparkles } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-20 space-y-4 sm:space-y-6 px-4">
      <div className="relative">
        {/* Outer Pulsing Ring */}
        <div className="absolute inset-0 rounded-full bg-neon-green blur-xl opacity-20 animate-pulse"></div>
        
        {/* Spinning Geometric Shape */}
        <div className="w-16 h-16 sm:w-24 sm:h-24 border-4 sm:border-8 border-t-electric-purple border-r-neon-green border-b-electric-purple border-l-transparent rounded-full animate-spin shadow-neo-purple"></div>
        
        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="text-neon-green animate-bounce" size={20} />
        </div>
      </div>
      
      <div className="text-center">
        <h2 className="text-lg sm:text-2xl font-black text-white tracking-widest uppercase italic">
          Mining <span className="text-neon-green">Content Gold</span>...
        </h2>
        <p className="text-gray-500 font-bold text-sm sm:text-base">Consulting the Llama-3 Oracle</p>
      </div>
    </div>
  );
}