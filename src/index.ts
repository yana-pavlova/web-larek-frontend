import './scss/styles.scss';
import { cloneTemplate } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { ItemView } from './components/ItemView';
import { ModalView } from './components/ModalView';
import { CartView } from './components/CartView';
import { CartModel } from './components/CartModel';
import { CustomerModel } from './components/CustomerModel';
import { PaymentType } from './types';
import { OrderFormView } from './components/OrderFormView';
import { ContactsFormView } from './components/ContactsFormView';

const events = new EventEmitter();

// тест ItemView start

// const testItems = [
//   {
//   "id": "1",
//   "description": "Если планируете решать задачи в тренажёре, берите два.",
//   "image": "./images/bg1s.jpg",
//   "title": "+1 час в сутках",
//   "category": "софт-скил",
//   "price": 350
//   },

//   {
//     "id": "2",
//     "description": "Если планируете решать задачи в тренажёре, берите два.",
//     "image": "./images/bg1s.jpg",
//     "title": "+1 час в сутках",
//     "category": "софт-скил",
//     "price": 50
//     },

//   {
//     "id": "3",
//     "description": "Если планируете решать задачи в тренажёре, берите два.",
//     "image": "./images/bg1s.jpg",
//     "title": "+1 час в сутках",
//     "category": "софт-скил",
//     "price": 100
//     },

//   {
//     "id": "4",
//     "description": "Если планируете решать задачи в тренажёре, берите два.",
//     "image": "./images/bg1s.jpg",
//     "title": "+1 час в сутках",
//     "category": "софт-скил",
//     "price": 7500
//     }
// ];
// const templateCard = document.querySelector('#card-catalog') as HTMLTemplateElement;
// const parentContainer = document.querySelector('.gallery') as HTMLElement;
// testItems.forEach((item) => {
//   const card = new ItemView(cloneTemplate(templateCard), parentContainer, item, events);
//   parentContainer.prepend(card.render(item));
// })

// тест ItemView end


// тест modalView start

// const modal = document.querySelector('#modal-container') as HTMLElement;
// const cartTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
// const modalTest = new ModalView(modal, events);
// modalTest.openModal(cloneTemplate(cartTemplate));

// тест modalView end


// тест cartView start

// const modal = document.querySelector('#modal-container') as HTMLElement;
// const cartTemplate = document.querySelector('#basket') as HTMLTemplateElement;
// const modalTest = new ModalView(modal, events);
// const itemCartTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
// const items = testItems.map((item) => {
//   const card = new ItemView(cloneTemplate(itemCartTemplate), parentContainer, item, events);
//   return card.render(item);
// });
// const cart = new CartView(items, cloneTemplate(cartTemplate), events);
// modalTest.openModal(cart.render());

// тест cartView end

// тест cartModel start

// const testCartModel = new CartModel(events);
// testCartModel.add("1");
// testCartModel.add("2");
// testCartModel.add("1");
// testCartModel.add("3");
// testCartModel.remove("2");

// console.log(testCartModel.items); // expected output: 2


// тест cartModel end


// тест CustomerModel start

// const testCustomerModel = new CustomerModel();
// testCustomerModel.address = "test address";
// testCustomerModel.email = "test email";
// testCustomerModel.phoneNumber = "test phone number";
// testCustomerModel.paymentType = PaymentType.Cash;
// console.log(testCustomerModel.customerFullInfo); // expected output: {paymentType: 'cash', address: 'test address', email: 'test email', phoneNumber: 'test phone number'}

// тест CustomerModel end


// тест OderFormView start

// const orderFormTemplate = document.querySelector('#order') as HTMLTemplateElement;
// const testOrderForm = new OrderFormView(cloneTemplate(orderFormTemplate), events);
// const modal = document.querySelector('#modal-container') as HTMLElement;
// const modalTest = new ModalView(modal, events);

// modalTest.openModal(testOrderForm.render());
// testOrderForm.toggleSubmitButton();

// тест OderFormView end


// тест ContactsFormView start

// const contactsFormTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
// const contactsForm = new ContactsFormView(cloneTemplate(contactsFormTemplate), events);
// const modal = document.querySelector('#modal-container') as HTMLElement;
// const modalTest = new ModalView(modal, events);

// modalTest.openModal(contactsForm.render());

// contactsForm.toggleSubmitButton();

// тест ContactsFormView end