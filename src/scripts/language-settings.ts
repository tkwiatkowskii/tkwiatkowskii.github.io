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
    if (language === 'pl') {
      window.location.href = '/src/locales/index.pl.html';
    }
    else {
      window.location.href = '/index.html';
    }
  }

  private changeLanguages() : void {
    this.polishLanguageButtons.forEach((btn) => {
      btn.addEventListener('pointerup', (event) => {
        event.stopPropagation();
        this.setLanguage('pl');
      });
    });

  // Add event listeners for all English language buttons
  this.englishLanguageButtons.forEach((btn) => {
    btn.addEventListener('pointerup', (event) => {
      event.stopPropagation();
      this.setLanguage('en');
    });
  });
}

  public static languageInit() : void {
    new LanguageConfig();
  }
}