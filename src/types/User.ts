export interface User {
  name: string;
  loading: boolean;
  error: UserErrorType;
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
