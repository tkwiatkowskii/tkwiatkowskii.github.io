import LanguageConfig from "./language-settings";
import ThemeConfig from "./theme-settings";

export default class Header {
  private button: HTMLButtonElement | null;
  private headerNav: HTMLDivElement | null;
  private headerWrapper: HTMLDivElement | null;
  private siteBody: HTMLBodyElement | null;
  private windowMedia: MediaQueryList;
  private buttonsWrapper: HTMLDivElement | null;
  private languageConfig: LanguageConfig;
  private themeConfig: ThemeConfig

  constructor(languageConfig : LanguageConfig, themeConfig : ThemeConfig) {
    this.button = document.querySelector<HTMLButtonElement>('.header__button');
    this.headerNav = document.querySelector<HTMLDivElement>('.header__navigation-menu');
    this.headerWrapper = document.querySelector<HTMLDivElement>('.layout__header');
    this.siteBody = document.querySelector('body');
    this.buttonsWrapper = document.querySelector<HTMLDivElement>('.header__buttons-wrapper');
    this.windowMedia = window.matchMedia('(min-width: 768px)');
    this.languageConfig = languageConfig;
    this.themeConfig = themeConfig;

    this.displayHeader();
  }

  private displayHeader() : void {
    this.updateImage();
    this.expandNavigation();
    this.setAfter();
    
    this.languageConfig.init();
    this.themeConfig.init();
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
        this.themeConfig.toggleTheme();
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
    new Header(new LanguageConfig(), new ThemeConfig());
  }
}
