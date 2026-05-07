import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Force light mode (dark mode removed)
document.documentElement.classList.remove("dark");
try { localStorage.removeItem("theme"); } catch {}

createRoot(document.getElementById("root")!).render(<App />);
