export default function saveScrollPosition() {
  const stored = localStorage.getItem('scrollPosition');
  const scrollPosition: number | null = stored ? parseInt(stored, 10) : null;
  if (scrollPosition !== null) window.scrollTo(0, scrollPosition);

  window.addEventListener("pagehide", () => {
    localStorage.setItem('scrollPosition', window.pageYOffset.toString());
  });
}