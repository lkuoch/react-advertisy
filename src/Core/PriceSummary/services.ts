import * as _ from "lodash";

import { Product } from "@Core/Cart/models";
import { Offer, Offers, ProductDiscountType } from "@Core/Customer/models";
import { Prices } from "./models";
import { ICustomerState } from "@Core/Customer/redux";

export function calculateNewTotals(input: {
  customerState: ICustomerState;
  currentOffers: Offers | undefined;
  products: Product[];
}): Prices {
  const { customerState, currentOffers, products } = _.cloneDeep(input);

  const { current, selections } = customerState;

  const currCustSelects = _.get(selections, [current], null);

  if (currCustSelects === null)
    return {
      totalPrice: 0,
      discountPrice: 0,
      finalTotalPrice: 0,
    };

  // Calculate prices
  let totalPrice = 0;
  let totalPriceWithDiscount = 0;

  for (let prodId in currCustSelects) {
    const retailPrice = products[prodId].RetailPrice;
    const productOffers = _.get(currentOffers, [prodId], []);
    const custQty = _.get(currCustSelects, [prodId, "qty"], 0);

    totalPrice += retailPrice * custQty;

    totalPriceWithDiscount += calculateDiscountedPrices({
      productOffers,
      custQty,
      retailPrice,
    });
  }

  return {
    totalPrice,
    discountPrice: totalPrice - totalPriceWithDiscount,
    finalTotalPrice: totalPriceWithDiscount,
  };
}

function calculateDiscountedPrices(input: {
  productOffers: Offer[];
  custQty: number;
  retailPrice: number;
}): number {
  const { custQty, productOffers, retailPrice } = _.cloneDeep(input);

  for (let productOffer of productOffers) {
    const type = productOffer.type as ProductDiscountType;

    switch (type) {
      case ProductDiscountType.XYDeal: {
        const [x, y] = productOffer.values;

        return calculateXYDeal([x, y], custQty, retailPrice);
      }

      case ProductDiscountType.NewPrice: {
        const [newPrice] = productOffer.values;

        return newPrice * custQty;
      }

      default: {
        break;
      }
    }
  }

  return retailPrice * custQty;
}

function calculateXYDeal([x, y]: [number, number], qty: number, price: number) {
  // Normal price
  if (qty < x) {
    return price * qty;
  }

  const quotient = Math.floor(qty / x);
  const remainder = qty % x;

  return quotient * y * price + remainder * price;
}