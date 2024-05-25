import { IFormView, IEventEmitter } from "../types";
import { cloneTemplate } from "../utils/utils";
import { View } from "./base/view";

export class ContactsFormView extends View implements IFormView {
  protected element: HTMLFormElement;
  protected submitButton: HTMLButtonElement;
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;
  protected email: string;
  protected phoneNumber: string;

  constructor(element: HTMLElement, events: IEventEmitter) {
    super(element, events);
    this.submitButton = this.element.querySelector('.submit-button') as HTMLButtonElement;
    this.emailInput = this.element.elements.namedItem('email') as HTMLInputElement;
    this.phoneInput = this.element.elements.namedItem('phone') as HTMLInputElement;

    this.emailInput.addEventListener(('input'), (event) => {
      this.email = this.emailInput.value;
      this.checkSubmitButtonState();
    })

    this.phoneInput.addEventListener(('input'), (event) => {
      this.phoneNumber = this.phoneInput.value;
      this.checkSubmitButtonState();
    })

    this.submitButton.addEventListener(('click'), (event) => {
      event.preventDefault();
      this.events.emit('orderData:finished', {email: this.emailInput.value, phone: this.phoneInput.value});
    })

  }

  protected checkSubmitButtonState() {
    if(this.phoneNumber && this.email) {
      this.submitButton.disabled = false;
    } else {
      this.submitButton.disabled = true;
    }
  }

  render() {
    return super.render() as HTMLFormElement;
  }
}