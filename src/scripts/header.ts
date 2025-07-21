const img = document.querySelector<HTMLImageElement>
  ('.header__icon--dynamic')
const windowMedia = window.matchMedia('(min-width: 900px)');

export default function updateImage() : void {
  if (!img || !windowMedia) return;

  const newImg : HTMLImageElement = document.createElement('img');
  newImg.classList.add('.header__icon--dynamic');

  const replaceImage = () => {
    if (windowMedia.matches) {
      newImg.src = './brightness.svg';
      newImg.alt = 'Brightness icon';
      newImg.classList.add('header__icon--menu')
    } else {
      newImg.src = './menu-icon.svg';
      newImg.alt = 'Menu icon';
      newImg.classList.add('header__icon--brightness')
    }
  }

  img.parentElement?.replaceChild(newImg, img);
  replaceImage();
  windowMedia.addEventListener('change', replaceImage);
}