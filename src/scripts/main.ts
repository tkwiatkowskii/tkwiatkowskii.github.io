import typewriterEffect from "./typewriter";
import Sidebar from "./sidebar";

window.onload = () => {
  typewriterEffect();
  let sidebar = new Sidebar();
  sidebar.toggleSidebar();
}