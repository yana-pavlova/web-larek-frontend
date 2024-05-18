import { IEventEmitter, IItem, IItemView } from "../types";
import { IView, View } from "./base/view";

export class ItemView extends View implements IItemView {
  category: HTMLSpanElement | null;
  title: HTMLHeadingElement | HTMLSpanElement | null;
  image: HTMLImageElement | null;
  price: HTMLSpanElement | null;
  description: HTMLParagraphElement | null;

  cartButton: HTMLButtonElement | null;

  constructor(element: HTMLElement, container: HTMLElement, data: Partial<IItem>, events: IEventEmitter) {
    super();

    this.element = element;
    this.container = container;

    this.category = element.querySelector('.card__category');
    this.title = element.querySelector('.card__title');
    this.image = element.querySelector('.card__image');
    this.price = element.querySelector('.card__price');
    this.description = element.querySelector('.card__text');

    // если это товар на главной странице, его можно открыть в модальном окне по клику на сам товар
    if(this.element.classList.contains('gallery__item')) {
      this.element.addEventListener(('click'), (event) => {
        console.log("Modal window opened,", data.id);
      })
    }

    this.cartButton = element.querySelector('.card__button');
    if(this.cartButton) {
      this.cartButton.addEventListener(('click'), (event) => {
        console.log("Cart data changed,", data.id);
      })
    }
  }

  render(data: Partial<IItem>): HTMLElement {
    if (data) {
      if(this.category && data.category) this.category.textContent = data.category;
      if(this.title && data.title) this.title.textContent = data.title;
      //if(this.image && data.image) this.image.src = `<%=require('${data.image}')%>`;
      if(this.price && data.price) this.price.textContent = `${data.price}`;
      if(this.description && data.description) this.description.textContent = data.description;
    }
    
    return super.render();
  }

}