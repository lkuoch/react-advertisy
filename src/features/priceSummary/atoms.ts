import { atom } from "jotai";

import { cartQueryAtom } from "../cart/atoms";
import { currentCustomerIdAtom, currentProductOffersAtom, customerSelectionsAtom } from "../customer/atoms";
import { calculateDiscountSavings, calculateFinalPrice } from "./services";

import type { Product } from "../../schema/generated";

export const basePriceAtom = atom((get) => {
  const customerId = get(currentCustomerIdAtom);

  return get<Product[]>(cartQueryAtom).reduce((subTotal, { id: productId, price }) => {
    const qty = get(customerSelectionsAtom({ customerId, productId })).qty;

    return (subTotal += qty * price);
  }, 0);
});

export const discountedPriceAtom = atom((get) => {
  const customerId = get(currentCustomerIdAtom);
  const products = get(cartQueryAtom);

  return products
    .map(({ id: productId, price }) => ({
      price,
      qty: get(customerSelectionsAtom({ customerId, productId })).qty,
      offers: get(currentProductOffersAtom(productId)),
    }))
    .reduce(
      (discountSavingsTotal, { offers, price, qty }) =>
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
