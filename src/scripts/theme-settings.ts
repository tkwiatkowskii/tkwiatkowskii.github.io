export default class ThemeConfig {
  private layout: HTMLDivElement | null;
  private themeButton: HTMLButtonElement | null;
  private umlInheritanceDiagram: HTMLPictureElement | null;
  private umlNoInheritanceDiagram: HTMLPictureElement | null;
  private umlInterfaceDiagram: HTMLPictureElement | null;

  constructor() {
    this.layout = document.querySelector<HTMLDivElement>('.layout');
    this.themeButton = document.querySelector<HTMLButtonElement>('.navigation__theme-icon');
    this.umlInheritanceDiagram = document.querySelector<HTMLPictureElement>
      ('.section__uml-inheritance-picture');
    this.umlNoInheritanceDiagram = document.querySelector<HTMLPictureElement>
      ('.section__uml-no-inheritance-picture');
    this.umlInterfaceDiagram = document.querySelector<HTMLPictureElement>
      ('.section__uml-interface-picture');
  }

  private changeThemeMode() : void {
    if (!this.themeButton) throw new Error("Couldn't add theme event handler");

    this.themeButton.addEventListener('pointerup', () => {
      this.toggleTheme();
    })
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

    this.changeUmlDiagramTheme();
  }

  public changeUmlDiagramTheme() : void {
    this.umlInheritanceDiagram = document.querySelector<HTMLPictureElement>
      ('.section__uml-inheritance-picture');
    this.umlNoInheritanceDiagram = document.querySelector<HTMLPictureElement>
      ('.section__uml-no-inheritance-picture');
    this.umlInterfaceDiagram = document.querySelector<HTMLPictureElement>
      ('.section__uml-interface-picture');

    if(!this.layout || !this.umlInheritanceDiagram 
      || !this.umlNoInheritanceDiagram || !this.umlInterfaceDiagram) 
      throw new Error("Couldn't set up uml load");

    const currentTheme : string | null = this.layout.getAttribute('data-theme');
    if (!currentTheme) return;

    this.umlInheritanceDiagram.innerHTML = `
        <img class="section__uml-image" src="/uml/uml-inheritance-${currentTheme}.svg" 
        alt="UML inheritance diagram" />
    `;
    this.umlNoInheritanceDiagram.innerHTML = `
        <img class="section__uml-image" src="/uml/uml-no-inheritance-${currentTheme}.svg" 
        alt="UML no inheritance diagram" />
    `;
    this.umlInterfaceDiagram.innerHTML = `
        <img class="section__uml-image" src="/uml/uml-interface-${currentTheme}.svg" 
        alt="UML interface diagram" />
    `;
  }

  private setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      this.layout?.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.layout?.setAttribute('data-theme', 'dark');
    } else {
      this.layout?.setAttribute('data-theme', 'light');
    }
  }

  public init() : void {
    this.setInitialTheme();
    this.changeThemeMode();
    this.changeUmlDiagramTheme();
  }
}