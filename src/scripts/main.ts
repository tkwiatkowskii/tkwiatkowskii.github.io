import '/src/styles/main.css';

import Sidebar from "./sidebar";
import Header from "./header";
import { typewriterEffect } from "./typewriter.js";
import saveScrollPosition from './save-scroll-position.js';

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
  }).then(() => {
    saveScrollPosition();
  });
});

import './prism.js';

