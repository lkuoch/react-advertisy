import * as services from "@Core/Cart/services";
import { Offers } from "@Core/Customer/models";
import { Product } from "@Core/Cart/models";

import { ICustomer } from "@Core/types";

describe("Cart Service Tests", () => {
  let customerSelections: ICustomer.ICustomerSelection;
  let customerId: number;
  let currentOffers: Offers | undefined;
  let products: Product[];

  describe("[calculateCustomerSpecialPrices]", () => {
    beforeEach(() => {
      customerId = 0;
      customerSelections = {};
      currentOffers = undefined;
      products = [
        {
          id: 0,
          Name: "Test Product",
          Description: "Test Product Description",
          RetailPrice: 100.0,
        },
      ];
    });

    describe("no current offers", () => {
      it("SHOULD return null", () => {
        const expectedResult = null;

        expect(
          services.calculateCustomerSpecialPrices({
            customerSelections,
            currentOffers,
            customerId,
            products,
          })
        ).toEqual(expectedResult);
      });
    });

    describe("NewPrice offers", () => {
      beforeEach(() => {
        currentOffers = {
          "0": [
            {
              type: "NewPrice",
              values: [75.0],
            },
          ],
        };
      });

      it("SHOULD return updated price", () => {
        const expectedResult: ICustomer.ICustomerSelection = {
          0: {
            0: {
              customerPrice: 75,
            },
          },
        };

        expect(
          services.calculateCustomerSpecialPrices({
            customerSelections,
            currentOffers,
            customerId,
            products,
          })
        ).toEqual(expectedResult);
      });
    });
  });
});
