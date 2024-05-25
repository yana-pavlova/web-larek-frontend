import { IEventEmitter, IFormView, PaymentType } from "../types";
import { View } from "./base/view";

export class OrderFormView extends View implements IFormView {
  protected element: HTMLFormElement;
  protected paymentCashButton: HTMLButtonElement;
  protected paymentCardButton: HTMLButtonElement;
  protected submitButton: HTMLButtonElement;
  protected adressInput: HTMLInputElement;
  protected payment: string;
  protected address: string;

  constructor(element: HTMLElement, events: IEventEmitter) {
    super(element, events);

    this.paymentCardButton = this.element.querySelector('#buttonCard') as HTMLButtonElement;
    this.paymentCashButton = this.element.querySelector('#buttonCash') as HTMLButtonElement;
    this.submitButton = this.element.querySelector('.order__button') as HTMLButtonElement;
    this.adressInput = this.element.elements.namedItem('address') as HTMLInputElement;

    this.adressInput.addEventListener(('input'), (event) => {
      this.address = this.adressInput.value;
      this.checkSubmitButtonState();
    })

    this.submitButton.addEventListener(('click'), (event) => {
      event.preventDefault();
      this.events.emit('orderData:changed', {payment: this.payment, address: this.adressInput.value});
    })

    this.paymentCashButton.addEventListener(('click'), (event) => {
      this.paymentCardButton.classList.remove('button_alt-active');
      this.paymentCashButton.classList.add('button_alt-active');
      this.payment = this.paymentCashButton.dataset.payment;
      this.checkSubmitButtonState();
    })

    this.paymentCardButton.addEventListener(('click'), (event) => {
      this.paymentCashButton.classList.remove('button_alt-active');
      this.paymentCardButton.classList.add('button_alt-active');
      this.payment = this.paymentCardButton.dataset.payment;
      this.checkSubmitButtonState();
    })
  }

  protected checkSubmitButtonState() {
    if(this.address && this.payment) {
      this.submitButton.disabled = false;
    } else {
      this.submitButton.disabled = true;
    }
  }

  render() {
    return super.render() as HTMLFormElement;
  }
}