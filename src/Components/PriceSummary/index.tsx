import React from "react";
import { useSelector } from "react-redux";

import { selectors } from "@Core/PriceSummary/redux";

export default function PriceSummary() {
  const prices = useSelector(selectors.selectPrices);
  // const foo = useSelector(selectors.selectBasePrice);

  return (
    <div id="price-summary">
      <div className="price-summary-wrapper ui clearing segment">
        <h3 className="ui dividing header right aligned">Item Totals</h3>

        <h4 id="total-price" className="ui header right aligned">
          ${prices.basePrice.toFixed(2)}
        </h4>

        {prices.discountPrice > 0 && (
          <>
            <h3 className="ui dividing header right aligned red">
              Your Savings
            </h3>
            <h4 id="discount-price" className="ui header right aligned red">
              ${prices.discountPrice.toFixed(2)}
            </h4>

            <h2 className="ui dividing header right aligned">Final Price</h2>
            <h3 id="discount-price" className="ui header right aligned">
              ${prices.totalPrice.toFixed(2)}
            </h3>
          </>
        )}
      </div>
    </div>
  );
}
