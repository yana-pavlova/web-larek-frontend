import { IEventEmitter, IItem, IItemView } from "../types";
import { cloneTemplate } from "../utils/utils";
import { View } from "./base/view";

export class ItemView implements IItemView {
  category: HTMLSpanElement | null;
  title: HTMLHeadingElement | HTMLSpanElement | null;
  image: HTMLImageElement | null;
  price: HTMLSpanElement | null;
  description: HTMLParagraphElement | null;
  data: Partial<IItem>;
  events: IEventEmitter;
  element: HTMLElement;

  addCartButton: HTMLButtonElement | null;
  removeCartButton: HTMLButtonElement | null;

  constructor(element: HTMLElement, data: Partial<IItem>, events: IEventEmitter) {
    this.events = events;
    this.data = data;

    this.element = element;

    this.category = element.querySelector('.card__category');
    this.title = element.querySelector('.card__title');
    this.image = element.querySelector('.card__image');
    this.price = element.querySelector('.card__price');
    this.description = element.querySelector('.card__text');

    // если это товар на главной странице, его можно открыть в модальном окне по клику на сам товар
    if(this.element.classList.contains('gallery__item')) {
      this.element.addEventListener(('click'), (event) => {
        this.events.emit('modal:open', {element: this.modalItemView as HTMLElement, data: this.data});
      })
    }

  }

  get cartItemView(): HTMLElement {
    const templateCartCard = document.querySelector('#card-basket') as HTMLTemplateElement;
    this.element = cloneTemplate(templateCartCard);
    this.title = this.element.querySelector('.card__title');
    this.price = this.element.querySelector('.card__price');

    this.removeCartButton = this.element.querySelector('.basket__item-delete');
    if(this.removeCartButton) {
      this.removeCartButton.addEventListener(('click'), (event) => {
        this.events.emit('cart:remove', {element: this.cartItemView as HTMLElement, data: this.data});
      })
    }

    return this.render();
  }

  get modalItemView() {
    const templateFullViewCard = document.querySelector('#card-preview') as HTMLTemplateElement;
    this.element = cloneTemplate(templateFullViewCard);
    this.category = this.element.querySelector('.card__category');
    this.title = this.element.querySelector('.card__title');
    this.image = this.element.querySelector('.card__image');
    this.price = this.element.querySelector('.card__price');
    this.description = this.element.querySelector('.card__text');
    
    this.addCartButton = this.element.querySelector('.card__button');
    if(this.addCartButton) {
      this.addCartButton.addEventListener(('click'), (event) => {
        this.events.emit('cart:add', {element: this.cartItemView as HTMLElement, data: this.data});
      })
    }

    return this.render();
  }

  render() {
    if (this.data) {
      if(this.category && this.data.category) this.category.textContent = this.data.category;
      if(this.title && this.data.title) this.title.textContent = this.data.title;
      //if(this.image && data.image) this.image.src = `<%=require('${data.image}')%>`;
      if(this.price && this.data.price) this.price.textContent = `${this.data.price}`;
      if(this.description && this.data.description) this.description.textContent = this.data.description;
    }
    
    return this.element;
  }

}