import typewriterEffect from "./typewriter";
import Sidebar from "./sidebar";
import Header from "./header";

window.onload = () => {
  typewriterEffect();
  Sidebar.init();
  Header.init();
};