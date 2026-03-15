export type ResourceType = "video" | "article" | "docs" | "course" | "book";

export interface Resource {
  title: string;
  url: string;
  type: ResourceType;
  is_free: boolean;
}

export interface TreeNode {
  id: string;
  label: string;
  description: string;
  level: number;
  parent_id: string | null;
  resources: Resource[];
}

export interface LearningTree {
  root_node_id: string;
  nodes: TreeNode[];
  generated_at: string;
}
