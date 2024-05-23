import { IContactsFormView, IEventEmitter } from "../types";
import { cloneTemplate } from "../utils/utils";

export class ContactsFormView implements IContactsFormView {
  protected form: HTMLFormElement;
  protected submitButton: HTMLButtonElement;
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;

  constructor(events: IEventEmitter) {
    this.form = cloneTemplate(document.querySelector('#contacts') as HTMLTemplateElement);
    this.submitButton = this.form.querySelector('.submit-button') as HTMLButtonElement;
    this.emailInput = this.form.elements.namedItem('email') as HTMLInputElement;
    this.phoneInput = this.form.elements.namedItem('phone') as HTMLInputElement;

    this.emailInput.addEventListener(('input'), (event) => {
      console.log("Email changed: ", this.emailInput.value);
    })

    this.phoneInput.addEventListener(('input'), (event) => {
      console.log("Phone changed: ", this.phoneInput.value);
    })

    this.submitButton.addEventListener(('click'), (event) => {
      event.preventDefault();
      console.log("Order submitted. Email and phone:", this.emailInput.value, this.phoneInput.value);
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