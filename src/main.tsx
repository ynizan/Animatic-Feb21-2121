import React from "react";
import { createRoot } from "react-dom/client";
import { PlayerShell } from "./components/PlayerShell";

const root = createRoot(document.getElementById("root")!);
root.render(<PlayerShell />);
