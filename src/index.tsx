import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("app") as HTMLDivElement);

root.render(<App />);
