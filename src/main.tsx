import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Entry point: hydrate the React application into the <div id="root"> in index.html
// and load global Tailwind/design-system styles from index.css.
createRoot(document.getElementById("root")!).render(<App />);
