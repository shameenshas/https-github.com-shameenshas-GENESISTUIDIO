import { Node, Edge } from 'reactflow';

export type NodeType = 'text' | 'image' | 'brain';

export interface NodeData {
  label?: string;
  content: string;
  type: NodeType;
  imageUrl?: string;
}

export interface StudioState {
  nodes: Node<NodeData>[];
  edges: Edge[];
}
