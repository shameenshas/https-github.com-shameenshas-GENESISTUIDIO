import React, { memo } from 'react';
import { Handle, Position, NodeProps, useStore } from 'reactflow';
import ReactMarkdown from 'react-markdown';
import { NodeData } from '../../types';
import { Brain, FileText, Image as ImageIcon } from 'lucide-react';

const CanvasNode: React.FC<NodeProps<NodeData>> = ({ data, id }) => {
  const zoom = useStore((s) => s.transform[2]);
  const isCollapsed = zoom < 0.6;

  const getIcon = () => {
    switch (data.type) {
      case 'brain': return <Brain className="w-4 h-4 text-[#00FF00]" />;
      case 'image': return <ImageIcon className="w-4 h-4 text-blue-400" />;
      default: return <FileText className="w-4 h-4 text-white/60" />;
    }
  };

  if (isCollapsed) {
    return (
      <div className="w-40 h-12 bg-black border border-white/40 flex items-center px-3 gap-2">
        <div className="w-2 h-2 bg-[#00FF00]" />
        <span className="font-mono text-[8px] uppercase tracking-tighter text-white/60 truncate">
          GENESIS // {data.type.toUpperCase()}
        </span>
        <Handle type="target" position={Position.Top} className="opacity-0" />
        <Handle type="source" position={Position.Bottom} className="opacity-0" />
      </div>
    );
  }

  return (
    <div className="min-w-[280px] max-w-[400px] bg-black border border-white/20 p-6 transition-all duration-300 hover:border-white/60 group">
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          {getIcon()}
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-medium text-[#00FF00]">
            {data.type}
          </span>
        </div>
        <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest">ID_{id.split('-')[0]}</span>
      </div>
      
      <div className="markdown-node prose prose-invert prose-sm max-w-none font-sans leading-relaxed text-white/90 font-light">
        <ReactMarkdown>{data.content}</ReactMarkdown>
      </div>

      {data.imageUrl && (
        <div className="mt-4 border border-white/10 overflow-hidden">
          <img 
            src={data.imageUrl} 
            alt="node-content" 
            className="w-full h-auto grayscale transition-all duration-500 group-hover:grayscale-0"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      <Handle type="target" position={Position.Top} className="!w-1.5 !h-1.5 !bg-[#00FF00] !border-none !rounded-none -top-[4px]" />
      <Handle type="source" position={Position.Bottom} className="!w-1.5 !h-1.5 !bg-[#00FF00] !border-none !rounded-none -bottom-[4px]" />
      <Handle type="source" position={Position.Left} className="!w-1.5 !h-1.5 !bg-white/40 !border-none !rounded-none" />
      <Handle type="source" position={Position.Right} className="!w-1.5 !h-1.5 !bg-white/40 !border-none !rounded-none" />
    </div>
  );
};

export default memo(CanvasNode);
