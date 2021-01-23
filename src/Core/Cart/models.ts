export interface ProductResponse {
  products: Product[];
}

export interface Product {
  id: number;
  Name: string;
  Description: string;
  RetailPrice: number;
}

export interface MappedProduct {
  [k: number]: Product;
}

export enum ProductSelectionType {
  Increment,
  Decrement,
}
