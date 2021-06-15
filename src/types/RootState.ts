import { ProductsState } from './Product';
import { UserState } from './User';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  userState: UserState;
  productsState: ProductsState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
