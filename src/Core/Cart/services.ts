import * as _ from "lodash";

import { Product, ProductSelectionType } from "./models";
import { Offers, OfferType } from "@Core/Customer/models";
import { CustomerState } from "@Core/Customer/redux";

export function calculateCustomerSpecialPrices(input: {
  customerState: CustomerState;
  currentOffers: Offers | undefined;
  products: Product[];
}) {
  const { customerState, currentOffers, products } = _.cloneDeep(input);
  const { selections, current } = customerState;

  if (currentOffers) {
    for (let product of products) {
      const offers = currentOffers[product.id] ?? [];

      for (let offer of offers) {
        const offerType = offer.type as OfferType;

        switch (offerType) {
          case OfferType.NewPrice: {
            const [newPrice] = offer.values;

            _.setWith(selections, [current, product.id, "customerPrice"], newPrice, Object);
            return selections;
          }

          default: {
            break;
          }
        }
      }
    }
  }

  return null;
}

export function handleCustomerSelection(input: {
  customerState: CustomerState;
  type: ProductSelectionType;
  productId: number;
}) {
  const { customerState, productId, type } = _.cloneDeep(input);
  const { selections, current } = customerState;

  // See if current customer has product in cart
  const currentCustomerQty = _.get(selections, [current, productId, "qty"], null);

  // Set initial value
  if (currentCustomerQty === null) {
    _.setWith(selections, [current, productId, "qty"], 1, Object);

    return selections;
  }

  // Handle increment / decrement
  switch (type) {
    case ProductSelectionType.Increment: {
      _.update(selections, [current, productId, "qty"], (n) => n + 1);
      break;
    }
    case ProductSelectionType.Decrement: {
      if (currentCustomerQty > 0) {
        _.update(selections, [current, productId, "qty"], (n) => n - 1);
      }
      break;
    }
    default:
      break;
  }

  return selections;
}
