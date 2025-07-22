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

    this.displayHeader();
  }

  private displayHeader() : void {
    this.updateImage();
    this.expandNavigation();
    this.configureHighlightSize();
  }

  private updateImage(): void {
    if (!this.button || !this.windowMedia) throw new Error("Couldn't update image");

    this.button.style.visibility = "visible";

    const img = this.button.querySelector('img');
    if (!img) throw new Error("Couldn't update image");

    const updateImg = (): void => {
      if (this.windowMedia.matches) {
        img.src = './brightness.svg';
        img.alt = 'Brightness icon';
        img.classList.add('header__icon--brightness');
        img.classList.remove('header__icon--menu');
      } else {
        img.src = './menu-icon.svg';
        img.alt = 'Menu icon';
        img.classList.add('header__icon--menu');
        img.classList.remove('header__icon--brightness');
      }
    };

    updateImg();
    this.windowMedia.addEventListener('change', updateImg);
  };

  private expandNavigation(): void {
    if (!this.button || !this.headerNav || !this.headerWrapper) 
      throw new Error("Couldn't expand navigation");

    this.button.addEventListener('pointerup', () => {
      const img = this.button!.firstElementChild;
      if (img?.classList.contains('header__icon--menu')) {
        this.headerNav!.classList.toggle('header__menu--collapsed');
        this.button!.classList.toggle('header--activated-mobile');
        this.headerWrapper!.classList.toggle('header--activated-mobile');
      }
      else {
        const layout = document.querySelector('body')
        if (!layout) throw new Error("Couldn't add light mode setting");

        const currentLightModeSetting : string = getComputedStyle(layout)
          .getPropertyValue('--mode');

        if (currentLightModeSetting === 'light') {
          layout.style.setProperty('--mode', 'dark')
        }
        else {
          layout.style.setProperty('--mode', 'light')
        }
      }
    });
  }

  private configureHighlightSize(): void {

    const calculateOffset = (): void => {
      if (!this.headerWrapper || !this.button) throw new Error("Couldn't calculate Offset");

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

  public static async init() : Promise<void> {
    new Header();
  }
}
