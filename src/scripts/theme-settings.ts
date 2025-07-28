export default class ThemeConfig {
  private layout: HTMLDivElement | null;
  private themeButton: HTMLButtonElement | null;
  private umlDiagram: HTMLPictureElement | null;

  constructor() {
    this.layout = document.querySelector<HTMLDivElement>('.layout');
    this.themeButton = document.querySelector<HTMLButtonElement>('.navigation__theme-icon');
    this.umlDiagram = document.querySelector<HTMLPictureElement>('.section__uml-picture');
  }

  private changeThemeMode() : void {
    if (!this.themeButton) throw new Error("Couldn't add theme event handler");

    this.themeButton.addEventListener('pointerup', () => {
      this.toggleTheme();
      this.changeUmlDiagramTheme();
    })
  }

  private loadSavedTheme() : void {
    const savedTheme : string | null = localStorage.getItem('theme');
    if (!savedTheme) return;

    this.layout?.setAttribute('data-theme', savedTheme);
  } 

  public toggleTheme() : void {
    if(!this.layout) throw new Error("Something went wrong with the layout");
    const currentTheme : string = this.layout.getAttribute('data-theme')!;

    if (currentTheme === 'dark') {
      this.layout.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
    else {
      this.layout.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  }

  public changeUmlDiagramTheme() : void {
    this.umlDiagram = document.querySelector<HTMLPictureElement>('.section__uml-picture');

    if(!this.layout || !this.umlDiagram) throw new Error("Couldn't set up uml load");

    const currentTheme : string | null = this.layout.getAttribute('data-theme');

    if (localStorage.getItem('theme') !== null) {
      this.umlDiagram.innerHTML = `
          <img class="section__uml-picture" src="/uml/uml-inheritance-${currentTheme}.svg" 
          alt="UML inheritance diagram" />
      `;
    };
  }

  public setThemeOnPreference() {
    if (!this.layout) throw new Error("Couldn't configure theme");

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark').matches) {
      this.layout.setAttribute('data-theme', 'dark');
    } else {
      this.layout.setAttribute('data-theme', 'light');
    };
  }

  public init() : void {
    this.setThemeOnPreference();
    this.changeThemeMode();
    this.loadSavedTheme();
    this.changeUmlDiagramTheme();
  }
}