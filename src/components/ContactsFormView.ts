import { IEventEmitter } from "../types";
import { View } from "./base/view";

export class ContactsFormView extends View {
  protected element: HTMLFormElement;
  protected submitButton: HTMLButtonElement;
  protected emailInput: HTMLInputElement;
  protected emailInputError: HTMLSpanElement;
  protected phoneInput: HTMLInputElement;
  protected phoneInputError: HTMLSpanElement;
  protected email: string;
  protected phoneNumber: string;

  constructor(element: HTMLElement, events: IEventEmitter) {
    super(element, events);
    this.submitButton = this.element.querySelector('.submit-button') as HTMLButtonElement;
    this.emailInput = this.element.elements.namedItem('email') as HTMLInputElement;
    this.phoneInput = this.element.elements.namedItem('phone') as HTMLInputElement;
    this.emailInputError = this.element.querySelector('.form__error-email') as HTMLSpanElement;
    this.phoneInputError = this.element.querySelector('.form__error-phone') as HTMLSpanElement;

    this.emailInput.addEventListener(('input'), (event) => {
      if(this.checkIfValidated("email")) {
        this.checkSubmitButtonState();
      } else this.submitButton.disabled = true;
    })

    this.phoneInput.addEventListener(('input'), (event) => {
      if(this.checkIfValidated("phone")) {
        this.checkSubmitButtonState();
      } else this.submitButton.disabled = true;
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

  protected checkIfValidated(value: string): boolean {
    switch(value) {
      case "email":
        if(!this.emailInput.validity.valid) {
          this.emailInputError.textContent = 'Некорректный email';
        } else {
          this.emailInputError.textContent = '';
        };
        break;

      case "phone":
        if(!this.phoneInput.validity.valid) {
          this.phoneInputError.textContent = 'Введите телефон в формате 89...';
        } else {
          this.phoneInputError.textContent = '';
        }
        break;
    };

    if(this.emailInput.validity.valid && this.phoneInput.validity.valid) {
      this.email = this.emailInput.value;
      this.phoneNumber = this.phoneInput.value;
      return true;
    };
  }

}