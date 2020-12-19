import React from "react";

import type { IPriceSummary } from "@AppTypes";

export default function PriceSummary(props: IPriceSummary.IProps) {
  return (
    <div id="price-summary">
      <div className="price-summary-wrapper ui clearing segment">
        <h3 className="ui dividing header right aligned">Item Totals</h3>

        <h4 id="total-price" className="ui header right aligned">
          ${props.prices.totalPrice.toFixed(2)}
        </h4>

        {props.prices.discountPrice > 0 && (
          <>
            <h3 className="ui dividing header right aligned red">
              Your Savings
            </h3>
            <h4 id="discount-price" className="ui header right aligned red">
              ${props.prices.discountPrice.toFixed(2)}
            </h4>

            <h2 className="ui dividing header right aligned">Final Price</h2>
            <h3 id="discount-price" className="ui header right aligned">
              ${props.prices.finalTotalPrice.toFixed(2)}
            </h3>
          </>
        )}
      </div>
    </div>
  );
}
