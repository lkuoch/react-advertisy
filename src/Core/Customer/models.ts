export enum ProductDiscountType {
  XYDeal = "XYDeal",
  NewPrice = "NewPrice",
}

export interface CustomerResponse {
  customers: Customer[];
}

export interface Customer {
  id: number;
  Name: string;
  Offers?: Offers;
}

export interface Offers {
  [productId: string]: Offer[] | undefined;
}

export interface Offer {
  type: string;
  values: number[];
}

export interface MappedCustomer {
  [k: number]: Customer;
}
