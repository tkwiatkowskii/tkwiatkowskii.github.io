export default class Header {
  private button: HTMLButtonElement | null;
  private headerNav: HTMLDivElement | null;
  private headerWrapper: HTMLDivElement | null;
  private windowMedia: MediaQueryList;

  constructor() {
    this.button = document.querySelector<HTMLButtonElement>('.header__button');
    this.headerNav = document.querySelector<HTMLDivElement>('.header__navigation-menu');
    this.headerWrapper = document.querySelector<HTMLDivElement>('.layout__header');
    this.windowMedia = window.matchMedia('(min-width: 768px)');

    this.updateImage();
    this.expandNavigation();

    // On small screens needs to wait for the header to expand
    setTimeout(() => {
      this.configureHighlightSize();
    }, 200);
  }

  private updateImage(): void {
    if (!this.button || !this.windowMedia) return;

    const existingImg: Element | null = this.button.firstElementChild;
    if (!existingImg) return;

    const newImg: HTMLImageElement = document.createElement('img');
    newImg.classList.add('header__icon--dynamic');

    const replaceImage = (): void => {
      if (this.windowMedia.matches) {
        newImg.src = './brightness.svg';
        newImg.alt = 'Brightness icon';
        newImg.classList.add('header__icon--brightness');
        newImg.classList.remove('header__icon--menu');
      } else {
        newImg.src = './menu-icon.svg';
        newImg.alt = 'Menu icon';
        newImg.classList.add('header__icon--menu');
        newImg.classList.remove('header__icon--brightness');
      }
    };

    this.button.replaceChild(newImg, existingImg);
    replaceImage();
    this.windowMedia.addEventListener('change', replaceImage);
  }

  private expandNavigation(): void {
    if (!this.button || !this.headerNav || !this.headerWrapper) return;

    this.button.addEventListener('pointerup', () => {
      const img = this.button!.firstElementChild;
      if (img?.classList.contains('header__icon--menu')) {
        this.headerNav!.classList.toggle('header__menu--collapsed');
        this.button!.classList.toggle('header--activated-mobile');
        this.headerWrapper!.classList.toggle('header--activated-mobile');
      }
    });
  }

  private configureHighlightSize(): void {

    const calculateOffset = (): void => {
      if (!this.headerWrapper || !this.button) return;

      const headerHeight: number = this.headerWrapper.getBoundingClientRect().height;
      const headerComputedStyle: CSSStyleDeclaration = getComputedStyle(this.headerWrapper);
      const borderBottom: number = parseFloat(headerComputedStyle.borderBottomWidth) || 0;
      const finalHeaderHeight: number = headerHeight - borderBottom;

      const afterStyle: CSSStyleDeclaration = getComputedStyle(this.button, '::after');
      const afterOffset: number = parseFloat(afterStyle.left);

      const buttonRect: DOMRect = this.button.getBoundingClientRect();
      const buttonLeft: number = buttonRect.left;

      const afterLeft: number = buttonLeft + afterOffset;

      this.headerWrapper.style.setProperty('--highlight-height', `${finalHeaderHeight}px`);
      this.headerWrapper.style.setProperty('--highlight-width', `${afterLeft}px`);
    };

    calculateOffset();
    window.addEventListener('resize', calculateOffset);
  }

  public static init() : void {
    new Header();
  }
}
