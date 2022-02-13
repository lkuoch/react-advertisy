import { calculateDiscountSavings } from "../services";
import { ProductOfferType } from "../../../schema/generated";

describe("PriceSummary service", () => {
  describe("calculateDiscountSavings", () => {
    it("should calculate new price properly", () => {
      const priceWithOffer = calculateDiscountSavings({
        qty: 1,
        price: 150.0,
        offer: {
          type: ProductOfferType.NewPrice,
          values: [100.0],
        },
      });

      expect(priceWithOffer).toEqual(50.0);
    });
  });
});
