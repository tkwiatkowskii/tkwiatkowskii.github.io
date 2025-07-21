const button = document.querySelector<HTMLButtonElement>
  ('.header__button')
const windowMedia = window.matchMedia('(min-width: 768px)');
const headerNav = document.querySelector<HTMLDivElement>
  ('.header__navigation-menu')

export default function updateImage() : void {
  if (!button || !windowMedia) return;

  let img = button.firstElementChild;

  if(!img) return;

  const newImg : HTMLImageElement = document.createElement('img');
  newImg.classList.add('header__icon--dynamic');

  const replaceImage = () => {
    if (windowMedia.matches) {
      newImg.src = './brightness.svg';
      newImg.alt = 'Brightness icon';
      newImg.classList.add('header__icon--brightness')
    } else {
      newImg.src = './menu-icon.svg';
      newImg.alt = 'Menu icon';
      newImg.classList.add('header__icon--menu')
    }
  }

  button.replaceChild(newImg, img);
  replaceImage();
  windowMedia.addEventListener('change', replaceImage);
}

export function expandNavigation(): void {
  if (!button || !headerNav) return;

  button.addEventListener('click', () => {
    const img = button.firstElementChild;
    if (img?.classList.contains('header__icon--menu')) {
      headerNav.classList.toggle('header__menu--collapsed');
    }
  });
}
