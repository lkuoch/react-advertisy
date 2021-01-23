import * as _ from "lodash";

import { MappedProduct, Product, ProductSelectionType } from "./models";
import { Offers, ProductDiscountType } from "@Core/Customer/models";
import type { ICustomer } from "@Core/types";

export function createMappedProducts(products: Product[]): MappedProduct {
  return _.keyBy(products, "id");
}

export function calculateCustomerSpecialPrices(input: {
  customerSelections: ICustomer.ICustomerSelection;
  customerId: number;
  currentOffers: Offers | undefined;
  products: Product[];
}) {
  const { currentOffers, customerId, customerSelections, products } = _.cloneDeep(input);

  if (currentOffers) {
    for (let product of products) {
      const offers = currentOffers[product.id] ?? [];

      for (let offer of offers) {
        const offerType = offer.type as ProductDiscountType;

        switch (offerType) {
          case ProductDiscountType.NewPrice: {
            const [newPrice] = offer.values;

            _.setWith(customerSelections, [customerId, product.id, "customerPrice"], newPrice, Object);
            return customerSelections;
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
  type: ProductSelectionType;
  customerSelections: ICustomer.ICustomerSelection;
  customerId: number;
  productId: number;
}) {
  const { customerId, customerSelections, productId, type } = _.cloneDeep(input);

  // See if current customer has product in cart
  const currentCustomerQty = _.get(customerSelections, [customerId, productId, "qty"], null);

  // Set initial value
  if (currentCustomerQty === null) {
    _.setWith(customerSelections, [customerId, productId, "qty"], 1, Object);

    return customerSelections;
  }

  // Handle increment / decrement
  switch (type) {
    case ProductSelectionType.Increment: {
      _.update(customerSelections, [customerId, productId, "qty"], (n) => n + 1);
      break;
    }
    case ProductSelectionType.Decrement: {
      if (currentCustomerQty > 0) {
        _.update(customerSelections, [customerId, productId, "qty"], (n) => n - 1);
      }
      break;
    }
    default:
      break;
  }

  return customerSelections;
}
