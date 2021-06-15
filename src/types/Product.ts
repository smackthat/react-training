export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: boolean;
}

export enum ProductCategory {
  MENS_CLOTHING = `men's clothing`,
  JEWELERY = `jewelery`,
  ELECTRONICS = `electronics`,
  WOMENS_CLOTHING = `women's clothing`,
}
