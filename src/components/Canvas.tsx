import React, { useMemo, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  BackgroundVariant,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CanvasNode from './nodes/CanvasNode';
import { NodeData } from '../types';

const nodeTypes = {
  custom: CanvasNode,
};

interface CanvasProps {
  nodes: Node<NodeData>[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
}

const Canvas: React.FC<CanvasProps> = ({ 
  nodes, 
  edges, 
  onNodesChange, 
  onEdgesChange, 
  onConnect 
}) => {
  return (
    <div className="w-full h-screen bg-black">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background 
          color="#333" 
          gap={24} 
          size={1} 
          variant={BackgroundVariant.Dots} 
        />
      </ReactFlow>
    </div>
  );
};

export default Canvas;
