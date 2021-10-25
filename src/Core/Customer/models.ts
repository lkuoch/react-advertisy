export enum OfferType {
  XYDeal = "XYDeal",
  NewPrice = "NewPrice",
}

export type CustomerResponse = {
  customers: Customer[];
};

export type Customer = {
  id: string;
  Name: string;
  Offers?: Offers;
};

export type Offers = {
  [productId: string]: Offer[] | undefined;
};

export type Offer = {
  type: OfferType;
  values: number[];
};

export type CustomerSelection = {
  [cusID: string]: {
    [prodID: string]: {
      qty?: number;
      customerPrice?: number;
    };
  };
};

export type CustomerMeta = {
  [cusID: string]: {
    discountsApplied: boolean;
  };
};
