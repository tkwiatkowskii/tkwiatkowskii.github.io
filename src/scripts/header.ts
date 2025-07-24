import LanguageConfig from "./language-settings";

export default class Header {
  private layout: HTMLDivElement | null;
  private button: HTMLButtonElement | null;
  private headerNav: HTMLDivElement | null;
  private headerWrapper: HTMLDivElement | null;
  private themeButton: HTMLButtonElement | null;
  private siteBody: HTMLBodyElement | null;
  private windowMedia: MediaQueryList;
  private buttonsWrapper: HTMLDivElement | null;

  constructor() {
    this.layout = document.querySelector<HTMLDivElement>('.layout');
    this.themeButton = document.querySelector<HTMLButtonElement>('.navigation__theme-icon');
    this.button = document.querySelector<HTMLButtonElement>('.header__button');
    this.headerNav = document.querySelector<HTMLDivElement>('.header__navigation-menu');
    this.headerWrapper = document.querySelector<HTMLDivElement>('.layout__header');
    this.siteBody = document.querySelector('body');
    this.buttonsWrapper = document.querySelector<HTMLDivElement>('.header__buttons-wrapper');
    this.windowMedia = window.matchMedia('(min-width: 768px)');

    this.displayHeader();
  }

  private displayHeader() : void {
    this.updateImage();
    this.expandNavigation();
    this.changeThemeMode();
    this.setAfter();
    LanguageConfig.languageInit();
  }

  private updateImage(): void {
    if (!this.button || !this.windowMedia) throw new Error("Couldn't update image");

    this.button.style.visibility = "visible";

    const img = this.button.querySelector('img');
    if (!img) throw new Error("Couldn't update image");

    const updateImg = () : void => {
      if (this.windowMedia.matches) {
        img.src = '/brightness.svg';
        img.alt = 'Theme icon';
        img.classList.add('header__icon--theme');
        img.classList.remove('header__icon--menu');
      } else {
        img.src = '/menu-icon.svg';
        img.alt = 'Menu icon';
        img.classList.add('header__icon--menu');
        img.classList.remove('header__icon--theme');
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
        this.headerNav!.classList.toggle('header__menu--collapse');
        this.button!.classList.toggle('header--activated-mobile');
        this.headerWrapper!.classList.toggle('header--activated-mobile');
        
      }
      else {
        if (!this.siteBody) throw new Error("Couldn't add light mode setting");
        this.toggleTheme();
      }
    });

    this.windowMedia.addEventListener('change', () => {
      if (this.windowMedia.matches) {
        this.headerNav?.classList.remove('header__menu--collapse');
        this.headerWrapper?.classList.remove("header--activated-mobile");
        this.button?.classList.remove("header--activated-mobile");
      };
    });
  }

  private changeThemeMode() : void {
    if (!this.themeButton) throw new Error("Couldn't add theme event handler");

    this.themeButton.addEventListener('pointerup', () => {
      this.toggleTheme();
    })
  }

  private toggleTheme() : void {
    if(!this.layout) throw new Error("Something went wrong with the layout");
    const currentTheme : string = this.layout.getAttribute('data-theme')!;

    if (currentTheme === 'dark') {
      this.layout.setAttribute('data-theme', 'light');
    }
    else {
      this.layout.setAttribute('data-theme', 'dark');
    }
  }

  private setAfter() : void {
    const calculateOffsetAfter = () : void => {
      if (!this.headerWrapper || !this.buttonsWrapper) throw new Error("Couldn't set ::after")

      const headerRect : DOMRect = this.headerWrapper.getBoundingClientRect();
      const buttonsRect : DOMRect = this.buttonsWrapper.getBoundingClientRect();

      const offset : number = buttonsRect.right - headerRect.left; 
      this.headerWrapper.style.setProperty('--after', `${offset}px`);
    }

    window.addEventListener('resize', calculateOffsetAfter);
    setTimeout(() => {
      calculateOffsetAfter();
    }, 1);
  }

  public static async init() : Promise<void> {
    new Header();
  }
}
