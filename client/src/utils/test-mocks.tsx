import { Product, ProductCategory } from 'types/Product';
import { CartItem, User, UserState } from 'types/User';
import { currencySum } from './helpers';

export const mockUser: User = {
  id: 2,
  userName: 'TEST',
};

export const mockLoggedInUserState: UserState = {
  user: mockUser,
  loading: false,
  error: null,
  cart: {
    items: [],
  },
};

export const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Shirt',
    description: 'A nice shirt',
    price: 9.99,
    category: ProductCategory.MENS_CLOTHING,
    image: '',
  },
  {
    id: 2,
    title: 'Skirt',
    description: 'A nice skirt',
    price: 19.99,
    category: ProductCategory.WOMENS_CLOTHING,
    image: '',
  },
  {
    id: 3,
    title: 'Phone X',
    description: 'A nice phone',
    price: 999.99,
    category: ProductCategory.ELECTRONICS,
    image: '',
  },
  {
    id: 4,
    title: 'Golden necklace',
    description: 'A nice necklace',
    price: 99.99,
    category: ProductCategory.JEWELERY,
    image: '',
  },
];

export const mockCartItems: CartItem[] = [
  {
    productId: mockProducts[0].id,
    title: mockProducts[0].title,
    quantity: 8,
    unitPrice: mockProducts[0].price,
    sum: currencySum(mockProducts[0].price, 8),
  },
  {
    productId: mockProducts[3].id,
    title: mockProducts[3].title,
    quantity: 1,
    unitPrice: mockProducts[3].price,
    sum: currencySum(mockProducts[3].price, 1),
  },
];
