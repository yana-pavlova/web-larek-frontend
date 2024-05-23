// тип оплаты
export enum PaymentType {
  Online = 'online',
  Cash = 'cash',
}

// данные товара
export interface IItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null; // есть товар, у которого нет цены
}

// модель покупателя
export interface ICustomerModel {
  customerFullInfo: ICustomer;
  validateCustomerAddress(data: string): boolean;
  validateCustomerEmail(data: string): boolean;
  validateCustomerPhoneNumber(data: string): boolean;
}

// данные покупателя
export interface ICustomer {
  paymentType: PaymentType;
  address: string;
  email: string;
  phoneNumber: string;
}

// каталог товаров
export interface IItemsData {
  items: IItem[];
  setItems(items: IItem[]): void;
  getItem(id: string): IItem;
  preview: string | null; // для отображения товара в попапе
}

// данные товара для отображения на главной странице (не используется в проекте)
export type TItemBaseInfo = Pick<IItem, 'category' | 'title' | 'image' | 'price' | 'id'>;

// данные товара для отображения в корзине (не используется в проекте)
export type TItemShortInfo = Pick<IItem, 'title' | 'price' | 'id'>;

// данные товара для отображения в модалке (не используется в проекте)
export type TItemFullInfo = Pick<IItem, 'image' | 'category' | 'title' | 'description' | 'price' | 'id'>;

// интерфейс корзины
export interface ICartModel {
  items: Map<string, number>;
  add(item: Partial<IItem>): void;
  remove(item: Partial<IItem>): void;
}

// интерфейс eventEmitter
export interface IEventEmitter {
  emit: (event: string, data: unknown) => void
}

// интерфейс корзины
export interface ICartView {
  render(): HTMLElement
}

// интерфейс формы с контактами
export interface IContactsFormView {
  render(): void;
  toggleSubmitButton(): void;
}

// интерфейс формы с адресом и типом оплаты
export interface IOrderFormView {
  form: HTMLFormElement;
  paymentCashButton: HTMLButtonElement;
  paymentCardButton: HTMLButtonElement;
  submitButton: HTMLButtonElement;
  adressInput: HTMLInputElement;

  render(): HTMLFormElement;
}

// интерфейс товара
export interface IItemView {
  render(): HTMLElement;
  category: HTMLSpanElement | null;
  title: HTMLHeadingElement | HTMLSpanElement | null;
  image: HTMLImageElement | null;
  price: HTMLSpanElement | null;
  description: HTMLParagraphElement | null;

  addCartButton: HTMLButtonElement | null;
  removeCartButton: HTMLButtonElement | null;
}

// интерфейс модального окна

export interface IModalView {
  openModal: (element: HTMLElement) => void;
  closeModal: () => void;
}

// интерфейс базового класса вью
export interface IView {
  element: HTMLElement,
  container: HTMLElement,
  render(data?: unknown): HTMLElement
}

//
export interface ModalOpenEventData {
  element: HTMLElement;
  data?: Partial<IItem>;
}

// интерфейс заказа
export type TOrder = [
  payment: PaymentType,
  email: string,
  phone: string,
  address: string,
  total: number,
  items: string[],
]
