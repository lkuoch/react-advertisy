import { calculateDiscountSavings } from "../services";
import { OfferType } from "../../customer/types";

describe("PriceSummary service", () => {
  describe("calculateDiscountSavings", () => {
    it("should calculate new price properly", () => {
      const priceWithOffer = calculateDiscountSavings({
        qty: 1,
        price: 150.0,
        offer: {
          type: OfferType.NewPrice,
          values: [100.0],
        },
      });

      expect(priceWithOffer).toEqual(50.0);
    });
  });
});
