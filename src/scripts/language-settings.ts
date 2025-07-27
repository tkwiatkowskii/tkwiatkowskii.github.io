export default class LanguageConfig {
  private languageButtons: HTMLButtonElement[];
  private languageDropdowns: HTMLDivElement[];
  private polishLanguageButtons: HTMLButtonElement[];
  private englishLanguageButtons: HTMLButtonElement[];

  constructor() {
    this.languageButtons = Array.from(document.querySelectorAll<HTMLButtonElement>
      ('.header__language-icon'));
    this.languageDropdowns = Array.from(document.querySelectorAll<HTMLDivElement>
      ('.header__language-dropdown'));
    this.polishLanguageButtons = Array.from(document.querySelectorAll<HTMLButtonElement>
      ('.header__language--pl'));
    this.englishLanguageButtons = Array.from(document.querySelectorAll<HTMLButtonElement>
      ('.header__language--en'));

    this.redirectOnPreferredLanguage();
    this.setupLanguageDropdowns();
    this.changeLanguages();
  }
  
  private setupLanguageDropdowns() : void {
    this.languageButtons.forEach((button, index) => {
      const dropdown = this.languageDropdowns[index];
      if (!button || !dropdown) throw new Error("Couldn't set up language dropdown");

      button.addEventListener('pointerup', (event) => {
        event.stopPropagation(); 
        dropdown.classList.toggle('header__language-dropdown--collapse');
      });
    });

    document.addEventListener('pointerup', (event) => {
      this.languageDropdowns.forEach((dropdown) => {
        if (!dropdown.contains(event.target as Node)) {
          dropdown.classList.remove('header__language-dropdown--collapse'); 
        }
      });
    });
  }

  private setLanguage(language : string) : void {
    localStorage.setItem('preferredLanguage', language);

    if (language === 'pl') {
      window.location.href = '/src/locales/index.pl.html';
    }
    else {
      window.location.href = '/index.html';
    }
  }

  private changeLanguages() : void {
    this.polishLanguageButtons.forEach((button) => {
      button.addEventListener('pointerup', (event) => {
        event.stopPropagation();
        this.setLanguage('pl');
      });
    });

    this.englishLanguageButtons.forEach((button) => {
      button.addEventListener('pointerup', (event) => {
        event.stopPropagation();
        this.setLanguage('en');
      });
    });
  }

  public static languageInit() : void {
    new LanguageConfig();
  }

  private redirectOnPreferredLanguage() : void {
    if (!localStorage.getItem('preferredLanguage')) {
      this.redirectOnBrowserLanguage();
      return;
    }

    const preferredLanguage : string | null = localStorage.getItem('preferredLanguage');
    const currentPath : string = window.location.pathname;


    if (preferredLanguage === 'pl' && currentPath !== '/src/locales/index.pl.html') {
      window.location.href = '/src/locales/index.pl.html';
    } else if (preferredLanguage === 'en' && currentPath !== '/index.html' && currentPath !== '/') {
      window.location.href = '/index.html';
    }
    else {
      return;
    }
  }

  private redirectOnBrowserLanguage() : void {
    const browserLanguage : string = navigator.language.split('-')[0];
    localStorage.setItem('preferredLanguage', browserLanguage);
    
    if (!['en', 'pl'].includes(browserLanguage) || browserLanguage == 'en') {
      window.location.href = '/index.html';
    } 
    else {
      window.location.href = '/src/locales/index.pl.html';
    }
  }
}