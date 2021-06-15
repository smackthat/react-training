export interface User {
  id: number;
  userName: string;
}

export interface CartItem {
  productId: number;
  title: string;
  quantity: number;
  sum: number;
}

export interface Cart {
  products: CartItem[];
}

export interface UserState {
  user: User;
  loading: boolean;
  error: UserErrorType[];
  cart?: Cart;
}

export enum UserErrorType {
  RESPONSE_ERROR,
  USER_NOT_FOUND,
  USER_NAME_EMPTY,
  PASSWORD_EMPTY,
}

export interface UserLogin {
  name: string;
  password: string;
}
