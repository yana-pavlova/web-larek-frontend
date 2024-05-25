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

export type TItems = {items: IItem[]};

// модель заказа
export interface IOrderModel {
  customerFullInfo: IOrder;
  payment: PaymentType;
  address: string;
  email: string;
  phone: string;
  items: string[];
  total: number;
}

// данные заказа
export interface IOrder {
  payment: PaymentType;
  address: string;
  email: string;
  phone: string;
  items: string[];
  total: number;
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
  add(item: Partial<IItem>): void;
  remove(item: Partial<IItem>): void;
  clear(): void;
  total: number;
}

// интерфейс eventEmitter
export interface IEventEmitter {
  emit: (event: string, data?: unknown) => void
}

// интерфейс корзины
export interface ICartView {
  render(): HTMLElement;
  addItem(item: HTMLElement, itemId: string, sum: number): void;
  removeItem(itemId: string): void;
  clear(): void;
}

// интерфейс форм
export interface IFormView {
  render(): HTMLFormElement;
}

// интерфейс товара
export interface IItemView {
  render: () => HTMLElement;
  cartItemView: HTMLElement;
  modalItemView: HTMLElement;
}

// интерфейс модального окна

export interface IModalView {
  openModal: (element: HTMLElement) => void;
  closeModal: () => void;
}

// интерфейс базового класса вью
export interface IView {
  render(data?: unknown): HTMLElement;
  toggleClass(element: HTMLElement, className: string): void;
}

//
export interface ModalOpenEventData {
  element: HTMLElement;
  data?: Partial<IItem>;
}

