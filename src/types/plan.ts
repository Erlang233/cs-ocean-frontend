export interface PlanResource {
  title: string;
  url: string;
  type: "video" | "article" | "docs" | "course" | "book";
  is_free: boolean;
}

export interface PlanNode {
  id: string;
  label: string;
  description: string;
  level: number; // 0=goal, 1=major, 2=subtopic, 3=task
  parent_id: string | null;
  tech_ref: string | null;
  resources: PlanResource[];
}

export interface ProjectLearningPlan {
  repo_url: string;
  repo_name: string;
  summary: string;
  root_node_id: string;
  nodes: PlanNode[];
  generated_at: string;
}
