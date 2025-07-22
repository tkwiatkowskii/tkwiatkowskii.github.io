export default class Sidebar {
  private lightUpEffect : HTMLDivElement | void;
  private button : HTMLButtonElement | null;
  private sidebarEffectContainer : HTMLDivElement | null;
  private sidebar : HTMLDivElement | null;
  private sidebarNavList : HTMLOListElement | null;

  constructor() {
    this.button = document.querySelector<HTMLButtonElement>('.sidebar__button');
    this.sidebarEffectContainer = document.querySelector<HTMLDivElement>('.sidebar__effect-container');
    this.lightUpEffect = this.createLightEffect();
    this.sidebar = document.querySelector<HTMLDivElement>('.sidebar__navigation-wrapper');
    this.sidebarNavList = document.querySelector<HTMLOListElement>('.sidebar__navigation-list');

    this.displaySidebar();
  }


  public displaySidebar(): void {
    const layout = document.querySelector<HTMLDivElement>
    ('.layout');

    if (!this.button || !layout) throw new Error("Couldn't attach event listener to the button");

    this.button.addEventListener('click', () => {
      layout.classList.toggle('layout--collapsed');
    });
      
    this.addGlowEffect();
    this.updateSidebarDataText();
  };

  private createLightEffect() : HTMLDivElement {
    if (!this.sidebarEffectContainer) throw new Error("Couldn't add light effect");

    const lightUpEffect : HTMLDivElement = document.createElement('div');

    lightUpEffect.classList.add('sidebar__effect');
    this.sidebarEffectContainer.prepend(lightUpEffect);

    return lightUpEffect;
  };

  private addGlowEffect() : void {
    if (!this.lightUpEffect || !this.sidebar || !this.sidebarEffectContainer) 
      throw new Error("Couldn't add glow effect");

    ['pointermove', 'focusin'].forEach((eventName: string) => {
      this.sidebar!.addEventListener(eventName, (event: Event) => {
        if (event.target === this.sidebarEffectContainer) return;

        const target = event.target as HTMLElement;

        if (!this.sidebar!.contains(target) && target !== this.sidebar) return;

        const listItem = target.closest('.sidebar__item');
        if (!listItem || !this.sidebarEffectContainer) return;

        const containerRect = this.sidebarEffectContainer.getBoundingClientRect();
        const itemRect = listItem.getBoundingClientRect();

        const relativeY = itemRect.top - containerRect.top;
        const itemHeight = itemRect.height;

        this.lightUpEffect!.style.transform = `translateY(${relativeY}px)`;
        this.lightUpEffect!.style.height = `${itemHeight}px`;
        this.lightUpEffect!.style.opacity = '1';
      });
    });

    ['pointerleave', 'focusout'].forEach((eventName: string) => {
      this.sidebar!.addEventListener(eventName, () => {
        this.lightUpEffect!.style.opacity = '0';
      });
    });

  }

  private updateSidebarDataText() : void {
    if (!this.sidebarNavList) throw new Error("Couldn't update sidebar text")

    const listItems = this.sidebarNavList.querySelectorAll('.sidebar__item');
    listItems.forEach((listItem) => {
      const textContent: string = listItem.textContent?.trim() ?? '';
      listItem.setAttribute('data-text', textContent);
    });
  }

  public static async init() : Promise<void> {
    new Sidebar();
  }
}