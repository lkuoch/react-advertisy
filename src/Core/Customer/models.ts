export enum ProductDiscountType {
  XYDeal = "XYDeal",
  NewPrice = "NewPrice",
}

export type CustomerResponse = {
  customers: Customer[];
};

export type Customer = {
  id: number;
  Name: string;
  Offers?: Offers;
};

export type Offers = {
  [productId: string]: Offer[] | undefined;
};

export type Offer = {
  type: string;
  values: number[];
};

export type CustomerSelection = {
  [cusID: number]: {
    [prodID: number]: {
      qty?: number;
      customerPrice?: number;
    };
  };
};

export type CustomerMeta = {
  [cusID: number]: {
    discountsApplied: boolean;
  };
};
