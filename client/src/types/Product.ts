import { TFunction } from 'i18next';
import { translations } from 'locales/translations';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: ProductCategory;
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

export function ProductCategoryToString(
  category: ProductCategory,
  t: TFunction,
) {
  switch (category) {
    case ProductCategory.ELECTRONICS:
      return t(translations.categories.electronics);
    case ProductCategory.JEWELERY:
      return t(translations.categories.jewelery);
    case ProductCategory.MENS_CLOTHING:
      return t(translations.categories.mensclothing);
    case ProductCategory.WOMENS_CLOTHING:
      return t(translations.categories.womensclothing);
    default:
      return '';
  }
}
