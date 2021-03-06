import { BillingMethod } from './BillingMethod';
import { Product } from './Product';

export interface User {
  userId: number;
  userName: string;
  name?: string;
  email?: string;
}

export interface CartItem {
  productId: number;
  title: string;
  quantity: number;
  unitPrice: number;
  sum: number;
}

export interface ItemAndQuantity {
  productId: number;
  quantity: number;
}

export interface ProductAndQuantity {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}

export interface Address {
  street: string;
  city: string;
  zipCode: string;
}

export interface Order {
  orderDate: number;
  deliveryDate: number;
  deliveryAddress: Address;
  billingMethod: BillingMethod;
  billingAddress?: Address;
  items: CartItem[];
  totalSum: number;
}

export interface UserState {
  user: User;
  loading?: boolean;
  error?: UserErrorType[];
  cart?: Cart;
  orderHistory?: Order[];
  addresses?: Address[];
}

export enum UserErrorType {
  RESPONSE_ERROR,
  USER_NOT_FOUND,
  USER_NAME_EMPTY,
  PASSWORD_EMPTY,
}

export interface UserLogin {
  username: string;
  password: string;
}
