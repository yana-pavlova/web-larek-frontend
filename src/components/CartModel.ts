import { ICartModel, IEventEmitter, IItem, TOrder } from "../types";

export class CartModel implements ICartModel {
  protected _items: Map<string, number> = new Map();
  protected _sum: number = 0;
  protected _orderedItems: string[] = [];
  protected _order: TOrder;

  constructor(protected events: IEventEmitter) {}

  add(data: Partial<IItem>): void {
    if(!this.items.has(data.id)) {
      this.items.set(data.id, 0);
      this.items.set(data.id, this.items.get(data.id)! + 1);
      this.sum += Number(data.price);
      this._changed();
    } else return
  }

  remove(data: Partial<IItem>): void {    
    if(!this.items.has(data.id)) return
    if(this.items.get(data.id)! > 0) {
      this.items.set(data.id, this.items.get(data.id)! - 1);
      if(this.items.get(data.id) === 0) this.items.delete(data.id);
      this.sum -= Number(data.price);
      this._changed();
    }
  }

  get items() {
    return this._items
  }

  set sum(value: number) {
    this._sum = value;
  }

  get sum() {
    return this._sum;
  }

  set orderedItems(data: string[]) {
    this._orderedItems = data;
  }

  get orderedItems(): string[] {
    return this._orderedItems;
  }

  protected _changed() {
    this.events.emit('cart:change', {items: Array.from(this.items.keys()), sum: this.sum});
  }
}