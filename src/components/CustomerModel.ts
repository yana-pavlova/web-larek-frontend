import { ICustomer, ICustomerModel, PaymentType } from "../types";

export class CustomerModel implements ICustomerModel {
  protected _paymentType: PaymentType;
  protected _address: string;
  protected _email: string;
  protected _phoneNumber: string;
  protected _customerFullInfo: ICustomer;

  constructor() {
    this._paymentType = PaymentType.Online;
    this._address = '';
    this._email = '';
    this._phoneNumber = '';
    this._customerFullInfo = {
      paymentType: this._paymentType,
      address: this._address,
      email: this._email,
      phoneNumber: this._phoneNumber
    }
  }

  set paymentType(paymentType: PaymentType) {
    this._paymentType = paymentType;
    this._customerFullInfo.paymentType = paymentType;
  }

  get paymentType(): PaymentType {
    return this._paymentType;
  }

  set address(address: string) {
    if(this.validateCustomerAddress(address)) {
      this._address = address;
      this._customerFullInfo.address = address;
    } else throw new Error('Invalid address');
  }

  get address(): string {
    return this._address;
  }

  set email(email: string) {
    if(this.validateCustomerEmail(email)) {
      this._email = email;
      this._customerFullInfo.email = email;
    } else throw new Error('Invalid email');
  }

  get email(): string {
    return this._email;
  }

  set phoneNumber(phoneNumber: string) {
    if(this.validateCustomerPhoneNumber(phoneNumber)) {
      this._phoneNumber = phoneNumber;
      this._customerFullInfo.phoneNumber = phoneNumber;  
    } else throw new Error('Invalid phone number');
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  get customerFullInfo(): ICustomer {
    return this._customerFullInfo;
  }

  // заготовки методов валидации
  validateCustomerAddress(data: string): boolean {
    if(data) return true
    return false
  }
  validateCustomerEmail(data: string): boolean {
    if(data) return true
    return false
  }

  validateCustomerPhoneNumber(data: string): boolean {
    if(data) return true
    return false
  }

  validateCustomerData(data: ICustomer): boolean {
    if(data) return true
    return false
  }
}