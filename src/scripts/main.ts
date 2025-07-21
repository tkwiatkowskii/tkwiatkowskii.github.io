import typewriterEffect from "./typewriter";
import Sidebar from "./sidebar";
import updateImage from "./header";

window.onload = () => {
  typewriterEffect();
  let sidebar = new Sidebar();
  sidebar.toggleSidebar();
  updateImage();
}