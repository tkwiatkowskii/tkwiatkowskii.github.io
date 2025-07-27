export default class ThemeConfig {
  private layout: HTMLDivElement | null;
  private themeButton: HTMLButtonElement | null;

  constructor() {
    this.layout = document.querySelector<HTMLDivElement>('.layout');
    this.themeButton = document.querySelector<HTMLButtonElement>('.navigation__theme-icon');
  }

  private changeThemeMode() : void {
    if (!this.themeButton) throw new Error("Couldn't add theme event handler");

    this.themeButton.addEventListener('pointerup', () => {
      this.toggleTheme();
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

  public init() : void {
    this.changeThemeMode();
    this.loadSavedTheme();
  }
}