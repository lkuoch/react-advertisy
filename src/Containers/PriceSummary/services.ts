import * as _ from "lodash";

import { MappedProduct } from "@Containers/Cart/models";
import { Offer, Offers, ProductDiscountType } from "@Containers/Customer/models";
import type { ICustomer, IPriceSummary } from "@AppTypes";

export function calculateNewTotals(input: {
  customerSelections: ICustomer.ICustomerSelection;
  currentCustomer: number;
  currentOffers: Offers | undefined;
  mappedProducts: MappedProduct;
}): IPriceSummary.IPrices {
  const { currentCustomer, customerSelections, currentOffers, mappedProducts } = _.cloneDeep(input);

  const currCustSelects = _.get(customerSelections, [currentCustomer], null);

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
    const retailPrice = mappedProducts[prodId].RetailPrice;
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

function calculateDiscountedPrices(input: { productOffers: Offer[]; custQty: number; retailPrice: number }): number {
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
