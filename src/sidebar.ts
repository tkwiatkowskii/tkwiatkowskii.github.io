const button = document.querySelector<HTMLButtonElement>
  ('.sidebar__button');
const layout = document.querySelector<HTMLDivElement>
  ('.layout');
const menuIcon = document.querySelector<HTMLImageElement>
  ('.sidebar__button.button__icon');

if (button && layout) {
  button.addEventListener('click', () => {
    layout.classList.toggle('layout--collapsed');
  });
}

if (menuIcon) {
  menuIcon.addEventListener('error', () => {
    menuIcon.style.display = 'none';
    const fallbackText = menuIcon.nextElementSibling;

    if (fallbackText && fallbackText instanceof HTMLSpanElement) {
      fallbackText.style.display = 'inline';
      fallbackText.style.position = 'absolute';
      fallbackText.style.right = '-2rem';
      fallbackText.style.top = '-0.2rem';
    }
  })
}


