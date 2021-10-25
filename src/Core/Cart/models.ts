export type ProductResponse = {
  products: Product[];
};

export type Product = {
  id: string;
  Name: string;
  Description: string;
  RetailPrice: number;
};

export enum ProductSelectionType {
  Increment,
  Decrement,
}

export type ProductSelectionPayload = {
  id: string;
  type: ProductSelectionType;
};
