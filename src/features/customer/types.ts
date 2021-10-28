// TODO - move to GraphQL
export enum OfferType {
  XYDeal = "XYDeal",
  NewPrice = "NewPrice",
}

export type CustomerResponse = {
  customers: Customer[];
};

export type Customer = {
  id: string;
  name: string;
  offers?: Record<string, Offer[]>;
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
