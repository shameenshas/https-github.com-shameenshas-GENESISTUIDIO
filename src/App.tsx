import React, { useState, useCallback, useEffect } from 'react';
import { 
  addEdge, 
  useNodesState, 
  useEdgesState, 
  Connection, 
  Edge,
  Node,
  ReactFlowProvider
} from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import Canvas from './components/Canvas';
import Portal from './components/Portal';
import ControlsPanel from './components/ControlsPanel';
import { NodeData } from './types';
import { chatWithBrain } from './services/geminiService';

const STORAGE_KEY = 'genesistudio_state';

const initialNodes: Node<NodeData>[] = [
  {
    id: 'genesis-0',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: { 
      type: 'text',
      content: '# GENESIS NODE: THE RABBIT SEED\n\n**Subject:** A Rabbit  \n**Action:** Planting a seed\n\n### ANALYSIS\nThe act of planting represents the beginning of a **recursive cycle**. The rabbit, small but intentional, triggers an event that will soon outgrow the canvas. This is the seed of our story.' 
    },
  },
];

function InnerApp() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Persistence: Load
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { nodes: savedNodes, edges: savedEdges } = JSON.parse(saved);
        setNodes(savedNodes);
        setEdges(savedEdges);
      } catch (e) {
        console.error("Failed to load state", e);
      }
    }
  }, [setNodes, setEdges]);

  // Persistence: Save
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes, edges }));
  }, [nodes, edges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleSendMessage = async (message: string) => {
    setIsLoading(true);
    try {
      const text = await chatWithBrain(message);

      // Create a user node for the prompt
      const promptNodeId = uuidv4();
      const promptNode: Node<NodeData> = {
        id: promptNodeId,
        type: 'custom',
        position: { x: Math.random() * 400, y: nodes.length * 100 + 200 },
        data: { 
          type: 'text',
          content: message 
        },
      };

      // Create an AI node for the response
      const responseNodeId = uuidv4();
      const responseNode: Node<NodeData> = {
        id: responseNodeId,
        type: 'custom',
        position: { x: Math.random() * 400 + 350, y: nodes.length * 100 + 250 },
        data: { 
          type: 'brain',
          content: text || "" 
        },
      };

      // Connect them
      const newEdge: Edge = {
        id: `e-${promptNodeId}-${responseNodeId}`,
        source: promptNodeId,
        target: responseNodeId,
      };

      setNodes((nds) => [...nds, promptNode, responseNode]);
      setEdges((eds) => [...eds, newEdge]);

    } catch (error) {
      console.error("Chat Error:", error);
      alert("Error communicating with the Brain. Please check console.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear the canvas?")) {
      setNodes(initialNodes);
      setEdges([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="w-full h-screen relative selection:bg-green-400 selection:text-black bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas 
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        />
      </div>
      
      <ControlsPanel />
      <Portal 
        onSendMessage={handleSendMessage} 
        onClear={handleClear}
        isLoading={isLoading} 
      />
      
      {/* HUD Elements */}
      <div className="fixed top-8 left-8 pointer-events-none z-50">
        <h1 className="font-display text-5xl tracking-[ -0.05em ] uppercase leading-none text-white">
          GENESI<span className="text-[#00FF00]">STUDIO</span>
        </h1>
        <div className="mt-2 flex items-center gap-3">
          <div className="h-[1px] w-12 bg-white/20" />
          <p className="font-mono text-[9px] tracking-[0.3em] text-white/40">
            SYSTEM.ARCH // ALPHA.01
          </p>
        </div>
      </div>
      
      <div className="fixed bottom-8 right-8 flex flex-col items-end gap-1 z-50 opacity-40 hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#00FF00] rounded-full animate-pulse" />
          <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-white">Neural Sync Active</span>
        </div>
        <span className="font-mono text-[8px] text-white/40 uppercase">Rabbit_Seed_Persistence_v1</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <InnerApp />
    </ReactFlowProvider>
  );
}
