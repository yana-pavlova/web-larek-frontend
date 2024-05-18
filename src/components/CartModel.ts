import { ICartModel, IEventEmitter } from "../types";

export class CartModel implements ICartModel {
  _items: Map<string, number> = new Map();

  constructor(protected events: IEventEmitter) {}

  add(id: string): void {
    if(!this.items.has(id)) this.items.set(id, 0);
    this.items.set(id, this.items.get(id)! + 1);
    this._changed();
  }

  remove(id: string): void {
    if(!this.items.has(id)) return
    if(this.items.get(id)! > 0) {
      this.items.set(id, this.items.get(id)! - 1);
      if(this.items.get(id) === 0) this.items.delete(id);
      this._changed();
    }
  }

  get items() {
    return this._items
  }

  protected _changed() {
    this.events.emit('basket:change', {items: Array.from(this.items.keys())})
  }
}