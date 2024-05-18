# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Данные и типы данных, используемые в приложении

тип оплаты
```
export enum PaymentType {
  Online = 'online',
  Cash = 'cash',
}
```

данные товара
```
export interface IItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
}
```

модель покупателя
```
export interface ICustomerModel {
  customerFullInfo: ICustomer;
  validateCustomerAddress(data: string): boolean;
  validateCustomerEmail(data: string): boolean;
  validateCustomerPhoneNumber(data: string): boolean;
}
```

данные покупателя
```
export interface ICustomer {
  paymentType: PaymentType;
  address: string;
  email: string;
  phoneNumber: string;
}
```

каталог товаров
```
export interface IItemsData {
  items: IItem[];
  setItems(items: IItem[]): void;
  getItem(id: string): IItem;
  preview: string | null; // для отображения товара в попапе
}
```

интерфейс корзины
```
export interface ICartModel {
  items: Map<string, number>;
  add(id: string): void;
  remove(id: string): void;
}
```

интерфейс eventEmitter
```
export interface IEventEmitter {
  emit: (event: string, data: unknown) => void
}
```

интерфейс корзины
```
export interface ICartView {
  items: HTMLElement[];
  parentContainer: HTMLElement;
  container: HTMLElement;
  submitButton: HTMLButtonElement;
  cartButton: HTMLButtonElement;
  price: HTMLSpanElement;

  render(): HTMLElement
}
```

интерфейс формы с контактами
```
export interface IContactsFormView {
  form: HTMLFormElement;
  submitButton: HTMLButtonElement;
  emailInput: HTMLInputElement;
  phoneInput: HTMLInputElement;

  render(): void;
  toggleSubmitButton(): void;
}
```

интерфейс формы с адресом и типом оплаты
```
export interface IOrderFormView {
  form: HTMLFormElement;
  paymentCashButton: HTMLButtonElement;
  paymentCardButton: HTMLButtonElement;
  submitButton: HTMLButtonElement;
  adressInput: HTMLInputElement;

  render(): HTMLFormElement;
}
```

интерфейс товара
```
export interface IItemView {
  render(data: Partial<IItem>): HTMLElement;
  category: HTMLSpanElement | null;
  title: HTMLHeadingElement | HTMLSpanElement | null;
  image: HTMLImageElement | null;
  price: HTMLSpanElement | null;
  description: HTMLParagraphElement | null;

  cartButton: HTMLButtonElement | null;
}
```

интерфейс модального окна
```
export interface IModalView {
  closeButton: HTMLElement;
  parentContainer: HTMLElement;
  container: HTMLElement;
  events: IEventEmitter;

  openModal: (element: HTMLElement) => void;
  closeModal: () => void;
}
```

интерфейс базового класса вью
```
export interface IView {
  element: HTMLElement,
  container: HTMLElement,
  render(data?: unknown): HTMLElement
}
```

## Архитектура приложения

Код приложения разделён на 3 слоя согласно парадигме MVP:
- слой данных (модель) отвечает за хранение и изменение данных; представлен следующими классами: CartModel, CustomerModel
- слой представления (вью) отвечает за отображение данных на странице; представлен следующими классами: View, ItemView, CartView, ContactsFormView, ModalView, OrderFormView
- презентер осуществляет связь представления и данных через события


### Базовый код

#### Класс api
Содержит базовую логику отправки запроса на сервер. Принимает в конструктор базовый URL сервера и объект с заголовками запросов.

Класс содержит следующие методы:
- `get` - выполняет GET запрос; в качестве параметра принимает URL (эндпойнт); возвращает промис с объектом ответа сервера
- `post` - выполняет POST запрос; в качестве параметров принимает URL (эндпойнт), объект, который преобразует в JSON, и тип запроса, который по умолчанию является POST; возвращает промис с ответом сервера

#### Класс events
Брокер событий, который позволяет отправлять события и подписываться на них. Класс используется презентором для обработки событий, а также моделью и вью для генерации событий.

Класс содержит следующие основные методы:
- `on` - устанавливает обработчик на событие
- `emit` - инициирует событие
- `trigger` - возвращает функцию, при вызове которой инициализируется событие, переданное в параметрах

#### Абстрактный класс View
Принадлежит слою представления (вью). Имеет пустой конструктор.

Имеет один метод:
- `render` - возвращает разметку элемента

#### Класс ItemView
Принадлежит слою представления (вью). Наследует от View. В конструктор принимает HTML элемент, который необходимо отобразить на странице, данные товара и экземпляр EventEmitter. В конструкторе инициализируются вёрстка товара и генерируются кастомные события при клике на кнопку добавления товара в корзину и нажатии на элемент товара в галерее товаров для открытия товара в модальном окне.

Переопределяет родительский метод:
- `render` - реализует разметку элемента

#### Класс ModalView
Принадлежит слою представления (вью). Реализует возможность открытия модального окна, а также его закрытия по кнопке закрытия, при клике вне модального окна и при нажатии клавиши Escape.
Note for self: создаётся только один экземпляр модалки, в который через рендер передаётся разметка, которую надо отобразить

Имеет три основных метода:
- `render` - рендерит содержимое модалки
- `openModal` - открывает модальное окно
- `closeModal` - закрывает модальное окно

#### Класс CartView
Принадлежит слою представления (вью). Реализует разметку корзины покупателя. В конструктор принимает массив сгенерированных разметок товаров, родительский контейнер корзины (из темплейта) и экземпляр EventEmitter.

Имеет один метод:
- `render` - возвращает разметку корзины

#### Класс OrderFormView
Принадлежит слою представления (вью). Реализует события формы. В контейнер принимает HTML элемент формы и экземпляр EventEmitter. В конструкторе генерируются кастомные события по клику на инпут с адресом, по клику на кнопку сабмита формы, по клику на обе кнопки оплаты.

Имеет два метода:
- `render` - возвращает разметку формы
- `toggleSubmitButton` - активирует/дезактивирует кнопку сабмита

#### Класс ContactsFormView
Принадлежит слою представления (вью). Реализует события формы. В контейнер принимает HTML элемент формы и экземпляр EventEmitter. В конструкторе генерируются кастомные события по клику на инпуты с почтой и номером телефона и по клику на кнопку сабмита формы.

Имеет два метода:
- `render` - возвращает разметку формы
- `toggleSubmitButton` - активирует/дезактивирует кнопку сабмита

#### Класс CartModel
Принадлежит слою модели (данных). Реализует хранение и изменение данных товаров в корзине покупателя; генерирует событие изменения данных в корзине во внешний мир (событие перехватывается презентером). В конструктор принимает экземпляр EventEmitter.

Имеет три метода:
- `add` - добавляет товар по его ID в массив товаров, хранящихся в корзине; вызывает метод EventEmitter, гененирующий кастомное событие `basket:change`
- `remove` - удаляет товар по его ID из массива товаров, хранящихся в корзине; вызывает метод EventEmitter, гененирующий кастомное событие `basket:change`
- геттер `items` - возвращает объект типа Map со всеми IDs товаров, которые лежат в корзине
