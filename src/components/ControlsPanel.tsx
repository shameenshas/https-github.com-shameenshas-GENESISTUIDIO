import React from 'react';
import { useReactFlow } from 'reactflow';
import { ZoomIn, ZoomOut, Maximize, Target } from 'lucide-react';
import { motion } from 'motion/react';

const ControlsPanel: React.FC = () => {
  const { zoomIn, zoomOut, fitView, setViewport } = useReactFlow();

  const handleCenter = () => {
    fitView({ duration: 800 });
  };

  const handleReset = () => {
    setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 800 });
  };

  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-black border border-white/10 p-1 backdrop-blur-md"
    >
      <button 
        onClick={() => zoomIn()}
        className="p-3.5 text-white/40 hover:text-[#00FF00] transition-colors"
        title="Zoom In"
      >
        <ZoomIn className="w-4 h-4" />
      </button>
      <button 
        onClick={() => zoomOut()}
        className="p-3.5 text-white/40 hover:text-[#00FF00] transition-colors border-l border-white/5"
        title="Zoom Out"
      >
        <ZoomOut className="w-4 h-4" />
      </button>
      <button 
        onClick={handleCenter}
        className="p-3.5 text-white/40 hover:text-[#00FF00] transition-colors border-l border-white/5"
        title="Fit View"
      >
        <Maximize className="w-4 h-4" />
      </button>
      <button 
        onClick={handleReset}
        className="p-3.5 text-white/40 hover:text-[#00FF00] transition-colors border-l border-white/5"
        title="Reset View"
      >
        <Target className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default ControlsPanel;
