import React from "react";

import { useAtomValue } from "jotai/utils";
import { basePriceAtom, discountedPriceAtom, finalPriceAtom } from "../../features/priceSummary/atoms";

const PriceSummary = () => {
  const basePrice = useAtomValue(basePriceAtom);
  const discountPrice = useAtomValue(discountedPriceAtom);
  const finalPrice = useAtomValue(finalPriceAtom);

  return (
    <>
      <h4 id="total-price" className="ui header right aligned">
        ${basePrice.toFixed(2)}
      </h4>

      {discountPrice > 0 && (
        <>
          <h3 className="ui dividing header right aligned red">Your Savings</h3>
          <h4 id="discount-price" className="ui header right aligned red">
            ${discountPrice.toFixed(2)}
          </h4>

          <h2 className="ui dividing header right aligned">Final Price</h2>
          <h3 id="discount-price" className="ui header right aligned">
            ${finalPrice.toFixed(2)}
          </h3>
        </>
      )}
    </>
  );
};

export default PriceSummary;
