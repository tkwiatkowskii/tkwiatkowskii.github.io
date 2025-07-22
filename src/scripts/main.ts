import typewriterEffect from "./typewriter";
import Sidebar from "./sidebar";
import Header from "./header";

document.addEventListener('DOMContentLoaded', () => {
  (async () => {
    await Promise.all([
      typewriterEffect(),
      Header.init(),
      Sidebar.init()
    ]);
  })();
});
