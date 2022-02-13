import { ProductOfferType } from "../../schema/generated";

export interface CustomerSelectionParam {
  customerId: string;
  productId: string;
}

export interface CustomerSelectionAtom extends CustomerSelectionParam {
  qty: number;
}
