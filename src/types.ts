import { Node, Edge } from 'reactflow';

export type NodeType = 'text' | 'image' | 'video' | 'music' | 'brain';

export interface NodeData {
  label?: string;
  content: string;
  type: NodeType;
  url?: string;
  onGenerate?: (id: string) => void;
}

export interface StudioState {
  nodes: Node<NodeData>[];
  edges: Edge[];
}
