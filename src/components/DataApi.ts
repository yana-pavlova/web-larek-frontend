import { Api } from './base/api';
import { IItem, TItems, IOrder } from '../types';

export class DataApi extends Api {

  constructor(baseUrl: string, options: RequestInit = {}) {
    super(baseUrl, options);
  }

  getItems(): Promise<TItems> {
    return this.get('/product') as Promise<TItems>;
  }

  getItem(id: string): Promise<IItem> {
    return this.get(`/product/${id}`) as Promise<IItem>;
  }

  sendOrder(data: IOrder): Promise<object> {
    return this.post('/order', data) as Promise<object>;
  }
}
