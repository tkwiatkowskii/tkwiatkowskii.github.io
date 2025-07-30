import '/src/styles/main.css';

import Sidebar from "./sidebar";
import Header from "./header";
import { typewriterEffect } from "./typewriter.js";

document.addEventListener('DOMContentLoaded', () => {
  (async () => {
    await Promise.all([
      typewriterEffect(),
      Header.init(),
      Sidebar.init()
    ]);
  })().catch( (error) => {
    alert(`
      Something went wrong - please refresh the site.
      Initialization error: ${error instanceof Error ? error.message : error}`);
  });
});

import './prism.js';

