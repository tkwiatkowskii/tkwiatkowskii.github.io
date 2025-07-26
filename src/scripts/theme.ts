export default async function setThemeOnPreference() : Promise<void> {
  document.addEventListener("DOMContentLoaded", () => {
    const layout = document.querySelector<HTMLDivElement>('.layout');
    if (!layout) throw new Error("Couldn't configure theme");

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark').matches) {
      layout.setAttribute('data-theme', 'dark');
    } else {
      layout.setAttribute('data-theme', 'light');
    }
  });
}