import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ProjectPage } from "./features/project-page/ProjectPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProjectPage />
  </StrictMode>
);
