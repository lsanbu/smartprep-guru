import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import KDxAIApp from "./KDxAIApp.tsx";
import "./index.css";

const rootElement = document.getElementById("kdxai-root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(
  <StrictMode>
    <KDxAIApp />
  </StrictMode>
);