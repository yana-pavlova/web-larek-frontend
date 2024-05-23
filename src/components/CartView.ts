import { ICartView, IEventEmitter, IItem } from "../types";
import { cloneTemplate } from "../utils/utils";

export class CartView implements ICartView {
  // items: HTMLElement[] = [];
  protected items: {
    element: HTMLElement;
    id: string
    }[] = [];
  protected parentContainer: HTMLElement;
  protected container: HTMLElement;
  protected submitButton: HTMLButtonElement;
  protected price: HTMLSpanElement;
  protected events: IEventEmitter;
  protected itemsCount: HTMLSpanElement;

  constructor(events: IEventEmitter) {
    const openCartButton = document.querySelector('.header__basket') as HTMLButtonElement;
    this.itemsCount = document.querySelector('.header__basket-counter') as HTMLSpanElement;
    const cartTemplate = document.querySelector('#basket') as HTMLTemplateElement;

    this.events = events;
    this.parentContainer = cloneTemplate(cartTemplate);
    this.container = this.parentContainer.querySelector('.basket__list') as HTMLElement;
    this.submitButton = this.parentContainer.querySelector('.basket__button') as HTMLButtonElement;
    
    this.price = this.parentContainer.querySelector('.basket__price') as HTMLSpanElement;

    openCartButton.addEventListener('click', (event) => {
      console.log("Cart opened");
      this.events.emit('modal:open', {element: this.render()})
    })
    
    this.submitButton.addEventListener('click', (event) => {
      this.events.emit('cart:submit', this.items.map(item => item.id));
    })
    
  }

  render(): HTMLElement {
    this.container.replaceChildren(...this.items.map((item) => item.element) || null);

    const itemIndexes = this.container.querySelectorAll('.basket__item-index') as NodeListOf<HTMLSpanElement>;
    itemIndexes.forEach((index, indexInArr) => {
      index.textContent = indexInArr + 1 + "";
    }, 0);

    this.submitButton.disabled = this.items.length === 0;

    return this.parentContainer;
  }

  addItem(item: HTMLElement, itemId: string, sum: number) {
    if(this.items.some(item => item.id === itemId)) return

    this.items.push({
      element: item,
      id: itemId
    });

    this.price.textContent = sum + " синапсов";

    this.updateItemsCount();
    this.render();
  }

  removeItem(itemId: string) {
    this.items = this.items.filter((item) => item.id !== itemId);
    
    this.updateItemsCount();
    this.render();
  }

  clear() {
    this.items = [];
    this.updateItemsCount();
    this.price.textContent = "0 синапсов";
    this.render();
  }

  protected updateItemsCount() {
    this.itemsCount.textContent = this.items.length + "";
  }
}