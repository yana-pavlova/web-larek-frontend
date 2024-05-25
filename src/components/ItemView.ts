import { IEventEmitter, IItem, IItemView } from "../types";
import { cloneTemplate } from "../utils/utils";
import { View } from "./base/view";

export class ItemView extends View implements IItemView {
  protected category: HTMLSpanElement | null;
  protected title: HTMLHeadingElement | HTMLSpanElement | null;
  protected image: HTMLImageElement | null;
  protected price: HTMLSpanElement | null;
  protected description: HTMLParagraphElement | null;
  protected _data: Partial<IItem>;
  protected addCartButton: HTMLButtonElement | null;
  protected removeCartButton: HTMLButtonElement | null;
  protected isInCart: boolean = false;

  constructor(element: HTMLElement, events: IEventEmitter, data: Partial<IItem>) {
    super(element, events);
    
    this._data = data;

    this.category = element.querySelector('.card__category');
    switch(this._data.category) {
      case "софт-скил":
        this.category?.classList.add('card__category_soft');
        break;
      case "другое":
        this.category?.classList.add('card__category_other');
        break;
      case "дополнительное":
        this.category?.classList.add('card__category_additional');
        break;
      case "кнопка":
        this.category?.classList.add('card__category_button');
        break;
      case "хард-скил":
        this.category?.classList.add('card__category_hard');
        break;
    }

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

  get data() {
    return this._data;
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
        this.isInCart = false;
        this.toggleaddCartButton(this.isInCart, "В корзину");
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
        this.isInCart = true;
        this.toggleaddCartButton(this.isInCart, "Товар в корзине");
      })
    };
    
    return this.render();
  }

  protected toggleaddCartButton(state: boolean, text: string) {
    this.addCartButton.disabled = state;
    this.addCartButton.textContent = text;
  }

  render() {
    if (this.data) {
      if(this.category && this.data.category) this.category.textContent = this.data.category;
      if(this.title && this.data.title) this.title.textContent = this.data.title;
      if(this.image && this.data.image) this.image.src = this.data.image;
      if(this.price && this.data.price) this.price.textContent = `${this.data.price} синапсов`;
      if(this.price && !this.data.price) {
        this.price.textContent = "бесценно";
        if(this.addCartButton) {
          this.toggleaddCartButton(true, "Вы не можете купить бесценный товар");
        }
      };
      if(this.description && this.data.description) this.description.textContent = this.data.description;
    }
    if(this.isInCart) {
      if(this.addCartButton) {
        this.toggleaddCartButton(this.isInCart, "Товар в корзине");
      }
    };
    
    return super.render();
  }

}