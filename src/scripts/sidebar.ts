export default function toggleSidebar(): void {
  const button = document.querySelector<HTMLButtonElement>
  ('.sidebar__button');
  const layout = document.querySelector<HTMLDivElement>
  ('.layout');

  if (button && layout) {
    button.addEventListener('click', () => {
      layout.classList.toggle('layout--collapsed');
    });
  }
}
