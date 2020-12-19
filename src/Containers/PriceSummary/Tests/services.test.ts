import * as services from "@Containers/PriceSummary/services";
import { Offers } from "@Containers/Customer/models";
import { MappedProduct } from "@Containers/Cart/models";

import { ICustomer, IPriceSummary } from "@AppTypes";

describe("PriceSummary Service Tests", () => {
  let customerSelections: ICustomer.ICustomerSelection;
  let currentCustomer: number;
  let currentOffers: Offers | undefined;
  let mappedProducts: MappedProduct;

  describe("[calculateNewTotals]", () => {
    beforeEach(() => {
      customerSelections = {};
      currentCustomer = 0;
      currentOffers = undefined;
      mappedProducts = {
        "0": {
          id: 0,
          Name: "Test Product",
          Description: "Test Product Description",
          RetailPrice: 100.0,
        },
      };
    });

    describe("customerSelections and currentOffers not initialized", () => {
      it("calculates default result", () => {
        const expectedResult: IPriceSummary.IPrices = {
          totalPrice: 0,
          discountPrice: 0,
          finalTotalPrice: 0,
        };

        expect(
          services.calculateNewTotals({
            customerSelections,
            currentCustomer,
            currentOffers,
            mappedProducts,
          })
        ).toEqual(expectedResult);
      });
    });

    describe("customerSelections initialized and currentOffers not initialized", () => {
      it("calculates 1 item result", () => {
        customerSelections = {
          "0": {
            "0": {
              qty: 1,
            },
          },
        };

        const expectedResult: IPriceSummary.IPrices = {
          totalPrice: 100.0,
          discountPrice: 0,
          finalTotalPrice: 100.0,
        };

        expect(
          services.calculateNewTotals({
            customerSelections,
            currentCustomer,
            currentOffers,
            mappedProducts,
          })
        ).toEqual(expectedResult);
      });

      it("calculates n item result", () => {
        customerSelections = {
          "0": {
            "0": {
              qty: 3,
            },
          },
        };

        const expectedResult: IPriceSummary.IPrices = {
          totalPrice: 300.0,
          discountPrice: 0,
          finalTotalPrice: 300.0,
        };

        expect(
          services.calculateNewTotals({
            customerSelections,
            currentCustomer,
            currentOffers,
            mappedProducts,
          })
        ).toEqual(expectedResult);
      });
    });

    describe("customerSelections initialized and currentOffers initialized", () => {
      describe("NewPrice offer scenario", () => {
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

        it("calculates 1 item discount result", () => {
          customerSelections = {
            "0": {
              "0": {
                qty: 1,
              },
            },
          };

          const expectedResult: IPriceSummary.IPrices = {
            totalPrice: 100.0,
            discountPrice: 25.0,
            finalTotalPrice: 75.0,
          };

          expect(expectedResult).toEqual(
            services.calculateNewTotals({
              customerSelections,
              currentCustomer,
              currentOffers,
              mappedProducts,
            })
          );
        });

        it("calculates n item discount result", () => {
          customerSelections = {
            "0": {
              "0": {
                qty: 3,
              },
            },
          };

          const expectedResult: IPriceSummary.IPrices = {
            totalPrice: 300.0,
            discountPrice: 75.0,
            finalTotalPrice: 225.0,
          };

          expect(expectedResult).toEqual(
            services.calculateNewTotals({
              customerSelections,
              currentCustomer,
              currentOffers,
              mappedProducts,
            })
          );
        });
      });

      describe("XYDeal offer scenario", () => {
        beforeEach(() => {
          currentOffers = {
            "0": [
              {
                type: "XYDeal",
                values: [5, 3],
              },
            ],
          };
        });

        it("calculates n < XYDeal discount result", () => {
          customerSelections = {
            "0": {
              "0": {
                qty: 1,
              },
            },
          };

          const expectedResult: IPriceSummary.IPrices = {
            totalPrice: 100.0,
            discountPrice: 0.0,
            finalTotalPrice: 100.0,
          };

          expect(
            services.calculateNewTotals({
              customerSelections,
              currentCustomer,
              currentOffers,
              mappedProducts,
            })
          ).toEqual(expectedResult);
        });

        it("calculates n >= XYDeal discount result", () => {
          customerSelections = {
            "0": {
              "0": {
                qty: 5,
              },
            },
          };

          const expectedResult: IPriceSummary.IPrices = {
            totalPrice: 500.0,
            discountPrice: 200.0,
            finalTotalPrice: 300.0,
          };

          expect(
            services.calculateNewTotals({
              customerSelections,
              currentCustomer,
              currentOffers,
              mappedProducts,
            })
          ).toEqual(expectedResult);
        });
      });
    });
  });
});
