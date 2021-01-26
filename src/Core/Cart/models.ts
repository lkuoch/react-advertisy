export type ProductResponse = {
  products: Product[];
};

export type Product = {
  id: number;
  Name: string;
  Description: string;
  RetailPrice: number;
};

export enum ProductSelectionType {
  Increment,
  Decrement,
}

export type ProductSelectionPayload = {
  id: number;
  type: ProductSelectionType;
};
