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

интерфейс api
```
export interface IDataApi {
  getItems(): Promise<{items: IItem[]}>;
  getItem(id: string): Promise<IItem>;
  sendOrder(data: IOrder): Promise<object>;
}
```

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
  price: number | null;
}
```

модель заказа
```
export interface IOrderModel {
  customerFullInfo: IOrder;
  payment: PaymentType;
  address: string;
  email: string;
  phone: string;
  items: string[];
  total: number;
}
```

данные заказа
```
export interface IOrder {
  payment: PaymentType;
  address: string;
  email: string;
  phone: string;
  items: string[];
  total: number;
}
```

интерфейс корзины
```
export interface ICartModel {
  add(item: Partial<IItem>): void;
  remove(item: Partial<IItem>): void;
  clear(): void;
  total: number;
}
```

интерфейс eventEmitter
```
export interface IEventEmitter {
  emit: (event: string, data?: unknown) => void
}
```

интерфейс корзины
```
export interface ICartView {
  addItem(item: HTMLElement, itemId: string, sum: number): void;
  removeItem(itemId: string): void;
  clear(): void;
}
```

интерфейс товара
```
export interface IItemView {
  getCartItemView(element: HTMLElement): HTMLElement;
  getModalItemView(element: HTMLElement): HTMLElement;
  data: Partial<IItem>;
}
```

интерфейс модального окна
```
export interface IModalView {
  openModal: (element: HTMLElement) => void;
  closeModal: () => void;
}
```

интерфейс базового класса вью
```
export interface IView {
  render(data?: unknown): HTMLElement;
  toggleClass(element: HTMLElement, className: string): void;
}
```

данные для передачи в eventEmitter
```
export interface IEventData {
  element: HTMLElement;
  data?: Partial<IItem>;
}
```

## Архитектура приложения

Код приложения разделён на 3 слоя согласно парадигме MVP:
- слой данных (модель) отвечает за хранение и изменение данных; представлен следующими классами: CartModel, OrderModel
- слой представления (вью) отвечает за отображение данных на странице; представлен следующими классами: View, ItemView, CartView, FormView, ContactsFormView, OrderFormView, SuccessWindowView, ModalView
- связь представления и данных осуществляется через события, код реализован императивно в index.ts


### Базовый код

#### Класс Api
Содержит базовую логику отправки запроса на сервер. Принимает в конструктор базовый URL сервера и объект с заголовками запросов.

Класс содержит следующие методы:
- `get` - выполняет GET запрос; в качестве параметра принимает URL (эндпойнт); возвращает промис с объектом ответа сервера
- `post` - выполняет POST запрос; в качестве параметров принимает URL (эндпойнт), объект, который преобразует в JSON, и тип запроса, который по умолчанию является POST; возвращает промис с ответом сервера

#### Класс DataApi
Наследует от Api.

Класс содержит следующие методы:
- `getItems` - выполняет GET запрос, возвращает промис с массивом товаров
- `getItem` - выполняет GET запрос, возвращает промис с одним товаром
- `sendOrder` - выполняет POST запрос, возвращает промис с ответом сервера

#### Класс events
Брокер событий, который позволяет отправлять события и подписываться на них. Класс используется презентором для обработки событий, а также моделью и вью для генерации событий.

Класс содержит следующие основные методы:
- `on` - устанавливает обработчик на событие
- `emit` - инициирует событие
- `trigger` - возвращает функцию, при вызове которой инициализируется событие, переданное в параметрах

#### Абстрактный класс View
Принадлежит слою представления (вью). Принимает HTML элемент и экземпляр EventEmitter, в конструкторе инициализирует их.

Имеет два метода:
- `render` - возвращает разметку элемента
- `toggleClass` - добавляет/удаляет класс HTML элементу

#### Класс ItemView
Принадлежит слою представления (вью). Наследует от View. В конструктор принимает HTML элемент, экземпляр EventEmitter и данные товара. В конструкторе инициализируется вёрстка товара и генерируются кастомные события.

Переопределяет родительский метод:
- `render` - реализует разметку элемента

Имеет два собственных метода:
- `cartItemView` - возвращает разметку товара для корзины
- `modalItemView` - возвращает разметку товара для модального окна

#### Класс ModalView (Singleton)
Принадлежит слою представления (вью). Наследует от View. Реализован паттерном Singleton. Обеспечивает возможность открытия/закрытия модального окна. В конструктор принимает экземпляр EventEmitter.

Имеет два основных метода:
- `openModal` - открывает модальное окно
- `closeModal` - закрывает модальное окно

#### Класс CartView
Принадлежит слою представления (вью). Наследует от View. Реализует разметку корзины покупателя. В конструктор принимает экземпляр EventEmitter.

Имеет 4 метода:
- `render` - возвращает разметку корзины, переопределяет родительский метод
- `addItem` - добавляет товар в корзину
- `removeItem` - удаляет товар из корзины
- `clear` - удаляет все товары из корзины

#### Класс FormView
Принадлежит слою представления (вью). Наследует от View. Публичных методов не имеет.

Обеспечивает потомков следующими методами:
- `checkSubmitButtonState` - меняет состояние кнопки сабмита
- `checkIfValidated` - показывает ошибки, если пользователь вводит неверную информацию в форму
- `setupInputValidation` - инициализирует валидацию инпутов в формах
- `additionalConditions` - метод проверки дополнительных условий для валидации форм, переопределяется в подклассах

#### Класс OrderFormView
Принадлежит слою представления (вью). Наследует от FormView. Генерирует кастомные события формы. Переопределяет родительский метод `additionalConditions`.

#### Класс ContactsFormView
Принадлежит слою представления (вью). Наследует от FormView. Генерирует кастомные события формы. Переопределяет родительский метод `additionalConditions`.

#### Класс SuccessWindowView
Принадлежит слою представления (вью). Наследует от View.

#### Класс CartModel
Принадлежит слою модели (данных). Реализует хранение и изменение данных товаров в корзине покупателя. В конструктор принимает экземпляр EventEmitter.

Имеет три метода:
- `add` - добавляет товар в корзину
- `remove` - удаляет товар из корзины
- `clear` - очищает корзину
- геттер `items` - возвращает все товары, которые лежат в корзине
- геттер `total` - возвращает сумму заказа

#### Класс OrderModel
Принадлежит слою модели (данных). Реализует хранение и изменение данных о покупке. Реализует разметку сообщения об успешной покупке.

Имеет следующие методы:
- сеттер и геттер `payment` - устанавливает тип оплаты
- сеттер и геттер `address` - устанавливает адрес
- сеттер и геттер `email` - устанавливает email
- сеттер и геттер `phone` - устанавливает номер телефона
- сеттер и геттер `items` - устанавливает купленные товары
- сеттер и геттер `total` - устанавливает сумму заказа
- геттер `customerFullInfo` - возвращает полные данные заказа