import { ICartView } from "../types";
import { EventEmitter } from "./base/events";

export class CartView implements ICartView {
  items: HTMLElement[];
  parentContainer: HTMLElement;
  container: HTMLElement;
  submitButton: HTMLButtonElement;
  cartButton: HTMLButtonElement;
  price: HTMLSpanElement;

  constructor(items: HTMLElement[], parentContainer: HTMLElement, events: EventEmitter) {
    this.items = items;
    this.parentContainer = parentContainer;
    this.container = parentContainer.querySelector('.basket__list') as HTMLElement;
    this.submitButton = this.parentContainer.querySelector('.basket__button') as HTMLButtonElement;
    this.cartButton = document.querySelector('.header__basket') as HTMLButtonElement;
    this.price = this.parentContainer.querySelector('.basket__price') as HTMLSpanElement;
    
    this.cartButton.addEventListener('click', (event) => {
      console.log("Cart opened");
    })
    
    this.submitButton.addEventListener('click', (event) => {
      console.log("Cart submitted");
    })
    
  }

  render() {
    this.container.prepend(...this.items);

    const itemIndexes = this.container.querySelectorAll('.basket__item-index') as NodeListOf<HTMLSpanElement>;
    itemIndexes.forEach((index, indexInArr) => {
      index.textContent = indexInArr + 1 + "";
    }, 0);

    // to-do: передавать в данных сумму?
    const prices = this.container.querySelectorAll('.card__price') as NodeListOf<HTMLSpanElement>;
    let totalPrice = 0;
    prices.forEach((price) => {
      totalPrice += Number(price.textContent);
    }, 0)
    
    this.price.textContent = totalPrice + " синапсов";

    return this.parentContainer;
  }
}