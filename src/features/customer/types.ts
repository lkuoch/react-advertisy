// TODO - move to GraphQL
export enum OfferType {
  XYDeal = "XYDeal",
  NewPrice = "NewPrice",
}

export interface Customer {
  id: string;
  name: string;
  offers?: {
    [productId: string]: Offer[];
  };
}

export interface Offer {
  type: OfferType;
  values: number[];
}

export interface CustomerSelectionParam {
  customerId: string;
  productId: string;
}

export interface CustomerSelectionAtom extends CustomerSelectionParam {
  qty: number;
}
