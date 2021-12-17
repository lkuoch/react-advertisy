import { cartQueryAtom } from "@features/cart/atoms";
import { atom } from "jotai";

import {
  currentCustomerAtom,
  currentCustomerProductOffersAtom,
  customerSelectionsAtom,
} from "@features/customer/atoms";
import { calculateDiscountSavings, calculateFinalPrice } from "./services";

import type { Product } from "@features/cart/types";

export const basePriceAtom = atom((get) => {
  const customerId = get(currentCustomerAtom);

  return get<Product[]>(cartQueryAtom).reduce((subTotal, { id: productId, retailPrice }) => {
    const qty = get(customerSelectionsAtom({ customerId, productId })).qty;

    return (subTotal += qty * retailPrice);
  }, 0);
});

export const discountedPriceAtom = atom((get) => {
  const customerId = get(currentCustomerAtom);
  const products = get(cartQueryAtom);

  return products
    .map(({ id: productId, retailPrice: price }) => ({
      price,
      qty: get(customerSelectionsAtom({ customerId, productId })).qty,
      offers: get(currentCustomerProductOffersAtom)(productId),
    }))
    .reduce(
      (discountSavingsTotal, { price, qty, offers }) =>
        (discountSavingsTotal += offers.reduce(
          (offerSavingsTotal, offer) => (offerSavingsTotal += calculateDiscountSavings({ price, qty, offer })),
          0
        )),
      0
    );
});

export const finalPriceAtom = atom((get) =>
  calculateFinalPrice({
    basePrice: get(basePriceAtom),
    discountPrice: get(discountedPriceAtom),
  })
);
