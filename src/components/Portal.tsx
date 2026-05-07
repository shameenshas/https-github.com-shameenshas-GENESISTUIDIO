import React, { useState } from 'react';
import { Send, Zap, Trash2, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PortalProps {
  onSendMessage: (message: string) => void;
  onClear: () => void;
  isLoading: boolean;
}

const Portal: React.FC<PortalProps> = ({ onSendMessage, onClear, isLoading }) => {
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
      setIsExpanded(false);
    }
  };

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-6">
      <AnimatePresence>
        {isExpanded && (
          <motion.form 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onSubmit={handleSubmit}
            className="w-[400px] bg-black border border-white/20 p-1 flex items-center shadow-[0_0_50px_rgba(0,255,0,0.1)]"
          >
            <input
              autoFocus
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Inject new logical layer..."
              className="flex-grow bg-transparent text-white px-4 py-3 outline-none font-mono text-xs uppercase tracking-widest placeholder:text-white/20"
            />
            <button 
              type="submit"
              className="p-3 text-[#00FF00] hover:bg-[#00FF00] hover:text-black transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="relative group cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        {/* Outer Ring */}
        <div className={`absolute inset-[-12px] border border-white/10 rounded-full transition-all duration-700 ${isLoading ? 'animate-spin border-t-[#00FF00] border-r-transparent' : 'group-hover:border-white/30'}`} />
        
        {/* Inner Ring (Pulsing) */}
        <motion.div 
          animate={isLoading ? { scale: [1, 1.2, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className={`relative w-16 h-16 rounded-full border-2 flex items-center justify-center transition-colors duration-500 
            ${isExpanded ? 'border-[#00FF00] bg-black shadow-[0_0_30px_rgba(0,255,0,0.2)]' : 'border-white/40 bg-black'}`}
        >
          <Zap className={`w-6 h-6 ${isLoading ? 'text-[#00FF00]' : 'text-white'}`} />
        </motion.div>
        
        {/* Helper text on hover */}
        {!isExpanded && (
          <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-[#00FF00]">
              Initialize Consciousness
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portal;
