import './scss/styles.scss';
import { cloneTemplate } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { ItemView } from './components/ItemView';
import { ModalView } from './components/ModalView';
import { CartView } from './components/CartView';
import { CartModel } from './components/CartModel';
import { CustomerModel } from './components/CustomerModel';
import { PaymentType, ModalOpenEventData, IItem } from './types';
import { OrderFormView } from './components/OrderFormView';
import { ContactsFormView } from './components/ContactsFormView';

// ТЕМПЛЕЙТЫ
const templateGalleryCard = document.querySelector('#card-catalog') as HTMLTemplateElement;

// ЭКЗЕМПЛЯРЫ КЛАССОВ
// один экземпляр EventEmitter
const events = new EventEmitter();

// один экземпляр корзины (модель, данные)
const cartData = new CartModel(events);

// один экземпляр корзины (вью)
const cartView = new CartView(events);

// один экземпляр покупателя (модель, данные)
const customerData = new CustomerModel();

// один экземпляр модального окна (вью)
const modalView = ModalView.getInstance(events);

// один экземпляр формы заказа
const orderForm = new OrderFormView(events);

// один экземпляр формы контактов
const contactsForm = new ContactsFormView(events);

// ТЕСТОВЫЕ КАРТОЧКИ
// карточки для теста
const testItems = [
  {
  "id": "1",
  "description": "Если планируете решать задачи в тренажёре, берите два.",
  "image": "./images/bg1s.jpg",
  "title": "название1",
  "category": "софт-скил",
  "price": 350
  },

  {
    "id": "2",
    "description": "Если планируете решать задачи в тренажёре, берите два.",
    "image": "./images/bg1s.jpg",
    "title": "название2",
    "category": "софт-скил",
    "price": 50
    },

  {
    "id": "3",
    "description": "Если планируете решать задачи в тренажёре, берите два.",
    "image": "./images/bg1s.jpg",
    "title": "название3",
    "category": "софт-скил",
    "price": 100
    },

  {
    "id": "4",
    "description": "Если планируете решать задачи в тренажёре, берите два.",
    "image": "./images/bg1s.jpg",
    "title": "название4",
    "category": "софт-скил",
    "price": 7500
    }
];

// инициализация карточек на странице
const gallery = document.querySelector('.gallery') as HTMLElement;
const cards = testItems.map((item) => {
  const card = new ItemView(cloneTemplate(templateGalleryCard), item, events);
  gallery.prepend(card.render());
  return card;
})

// ПОДПИСКА НА СОБЫТИЯ

// вью генерирует событие открытия модалки -> модалка открывается
events.on<ModalOpenEventData>('modal:open', (item) => {
  modalView.openModal(item.element as HTMLElement);
});

// вью генерирует событие удаления товара из корзины -> модель корзины (данные) удаляет у себя товар и генерит cart:change
// можно объединить со следующим и передавать в параметрах плюс или минус в зависимости от того, нужно ли удалять или добавлять
events.on<ModalOpenEventData>('cart:remove', (item) => {
  cartData.remove(item.data);
});
// вью генерирует событие добавления товара в корзину -> модель корзины (данные) добавляет к себе товар и генерит cart:change
events.on<ModalOpenEventData>('cart:add', (item) => {
  console.log(item.data.price);
  cartData.add(item.data);
})

// модель корзины сгенерировала событие, что она изменилась -> представление корзины отреагировало (корзина добавила все товары)
events.on<{items: string[]}>('cart:change', (data) => {
  cartView.clear();
  cards.forEach(item => {
    data.items.forEach(dataItem => {
      if(item.data.id === dataItem) {
        cartView.addItem(item.cartItemView, item.data.id, cartData.sum);
      }
    })
  })
})
// вью генерирует событие сабмита формы -> модель корзины (данные) сохраняет ID купленных товаров, после чего открывается модалка с формой контактов
events.on<[id: string]>('cart:submit', (data) => {
  cartData.orderedItems = data;
  modalView.openModal(orderForm.render());
})

