import { IEventEmitter, IOrderFormView } from "../types";
import { cloneTemplate } from "../utils/utils";

export class OrderFormView implements IOrderFormView {
  form: HTMLFormElement;
  paymentCashButton: HTMLButtonElement;
  paymentCardButton: HTMLButtonElement;
  submitButton: HTMLButtonElement;
  adressInput: HTMLInputElement;

  constructor(events: IEventEmitter) {
    this.form = cloneTemplate(document.querySelector('#order') as HTMLTemplateElement);
    this.paymentCashButton = this.form.querySelector('#buttonCard') as HTMLButtonElement;
    this.paymentCardButton = this.form.querySelector('#buttonCash') as HTMLButtonElement;
    this.submitButton = this.form.querySelector('.order__button') as HTMLButtonElement;
    this.adressInput = this.form.elements.namedItem('address') as HTMLInputElement;

    this.adressInput.addEventListener(('input'), (event) => {
      console.log("Address changed: ", this.adressInput.value);
    })

    this.submitButton.addEventListener(('click'), (event) => {
      event.preventDefault();
      console.log("Order submitted. Address:", this.adressInput.value);
    })

    this.paymentCashButton.addEventListener(('click'), (event) => {
      console.log("Cash payment selected");
    })

    this.paymentCardButton.addEventListener(('click'), (event) => {
      console.log("Card payment selected");
    })
  }

  toggleSubmitButton() {
    if(this.submitButton.disabled === false) {
      this.submitButton.disabled = true;
    } else {
      this.submitButton.disabled = false;
    }
  }

  render() {
    return this.form
  }
}