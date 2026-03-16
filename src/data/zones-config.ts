export interface ZoneConfig {
  id: string;
  label: string;
  color: string;
  bgColor: string;
}

export const ZONES: ZoneConfig[] = [
  { id: "frontend",  label: "Frontend",         color: "#22d3ee", bgColor: "rgba(34,211,238,0.05)" },
  { id: "backend",   label: "Backend & APIs",   color: "#14b8a6", bgColor: "rgba(20,184,166,0.05)" },
  { id: "database",  label: "Databases",        color: "#3b82f6", bgColor: "rgba(59,130,246,0.05)" },
  { id: "cloud",     label: "Cloud & DevOps",   color: "#6366f1", bgColor: "rgba(99,102,241,0.05)" },
  { id: "systems",   label: "Systems & Networking", color: "#8b5cf6", bgColor: "rgba(139,92,246,0.05)" },
  { id: "ai",        label: "AI & Languages",   color: "#ec4899", bgColor: "rgba(236,72,153,0.05)" },
];

/** Map nodeId → { zone, devicon class (optional) } */
export const NODE_ZONE_MAP: Record<string, { zone: string; icon?: string }> = {
  // Frontend
  "html":              { zone: "frontend",  icon: "devicon-html5-original colored" },
  "css":               { zone: "frontend",  icon: "devicon-css3-original colored" },
  "javascript":        { zone: "frontend",  icon: "devicon-javascript-plain colored" },
  "typescript":        { zone: "frontend",  icon: "devicon-typescript-plain colored" },
  "react":             { zone: "frontend",  icon: "devicon-react-original colored" },
  "vue":               { zone: "frontend",  icon: "devicon-vuejs-plain colored" },
  "angular":           { zone: "frontend",  icon: "devicon-angularjs-plain colored" },
  "svelte":            { zone: "frontend",  icon: "devicon-svelte-plain colored" },
  "webassembly":       { zone: "frontend" },
  "browser-apis":      { zone: "frontend" },
  "web-animations":    { zone: "frontend" },
  "accessibility":     { zone: "frontend" },
  "aria":              { zone: "frontend" },
  "dom":               { zone: "frontend" },
  "web-components":    { zone: "frontend" },
  "css-grid":          { zone: "frontend",  icon: "devicon-css3-original colored" },
  "css-flexbox":       { zone: "frontend",  icon: "devicon-css3-original colored" },
  "pwa":               { zone: "frontend" },

  // Backend
  "nodejs":            { zone: "backend",   icon: "devicon-nodejs-plain colored" },
  "python":            { zone: "backend",   icon: "devicon-python-plain colored" },
  "fastapi":           { zone: "backend",   icon: "devicon-fastapi-plain colored" },
  "django":            { zone: "backend",   icon: "devicon-django-plain colored" },
  "express":           { zone: "backend",   icon: "devicon-express-original colored" },
  "restapi":           { zone: "backend" },
  "graphql":           { zone: "backend",   icon: "devicon-graphql-plain colored" },
  "grpc":              { zone: "backend" },
  "websockets":        { zone: "backend" },
  "oauth":             { zone: "backend" },
  "jwt":               { zone: "backend" },
  "rabbitmq":          { zone: "backend",   icon: "devicon-rabbitmq-original colored" },
  "kafka":             { zone: "backend",   icon: "devicon-apachekafka-original colored" },
  "protobuf":          { zone: "backend" },
  "apollo":            { zone: "backend",   icon: "devicon-apollographql-plain colored" },
  "celery":            { zone: "backend" },
  "nginx":             { zone: "backend",   icon: "devicon-nginx-original colored" },

  // Database
  "postgresql":        { zone: "database",  icon: "devicon-postgresql-plain colored" },
  "mysql":             { zone: "database",  icon: "devicon-mysql-plain colored" },
  "mongodb":           { zone: "database",  icon: "devicon-mongodb-plain colored" },
  "redis":             { zone: "database",  icon: "devicon-redis-plain colored" },
  "nosql":             { zone: "database" },
  "indexing":          { zone: "database" },
  "hashing":           { zone: "database" },

  // Cloud & DevOps
  "docker":            { zone: "cloud",     icon: "devicon-docker-plain colored" },
  "kubernetes":        { zone: "cloud",     icon: "devicon-kubernetes-plain colored" },
  "terraform":         { zone: "cloud",     icon: "devicon-terraform-plain colored" },
  "aws":               { zone: "cloud",     icon: "devicon-amazonwebservices-plain-wordmark colored" },
  "gcp":               { zone: "cloud",     icon: "devicon-googlecloud-plain colored" },
  "cicd":              { zone: "cloud" },
  "git":               { zone: "cloud",     icon: "devicon-git-plain colored" },
  "observability":     { zone: "cloud" },

  // Systems & Networking
  "tcp-ip":            { zone: "systems" },
  "dns":               { zone: "systems" },
  "http":              { zone: "systems" },
  "linux":             { zone: "systems",   icon: "devicon-linux-plain colored" },
  "data-structures":   { zone: "systems" },
  "algorithms":        { zone: "systems" },
  "computer-architecture": { zone: "systems" },
  "networking-fundamentals": { zone: "systems" },
  "os-fundamentals":   { zone: "systems" },
  "security-fundamentals": { zone: "systems" },
  "cryptography":      { zone: "systems" },

  // AI & Languages
  "pytorch":           { zone: "ai",        icon: "devicon-pytorch-original colored" },
  "tensorflow":        { zone: "ai",        icon: "devicon-tensorflow-original colored" },
  "llms":              { zone: "ai" },
  "rust":              { zone: "ai",        icon: "devicon-rust-plain colored" },
  "go":                { zone: "ai",        icon: "devicon-go-original colored" },
  "cpp":               { zone: "ai",        icon: "devicon-cplusplus-plain colored" },
  "compilers":         { zone: "ai" },
  "llvm":              { zone: "ai" },
  "distributed-systems": { zone: "ai" },
};

/** Layer fallback if node is not in NODE_ZONE_MAP */
export const LAYER_ZONE_FALLBACK: Record<string, string> = {
  surface: "frontend",
  mid: "backend",
  deep_mid: "systems",
  deep: "cloud",
};
