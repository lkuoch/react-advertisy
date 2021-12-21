import React from "react";

import Prices from "./prices";
import Loader from "../common/loader";

const PriceSummary = () => {
  return (
    <div id="price-summary">
      <div className="price-summary-wrapper ui clearing segment">
        <h3 className="ui dividing header right aligned">Item Totals</h3>

        <React.Suspense fallback={<Loader />}>
          <Prices />
        </React.Suspense>
      </div>
    </div>
  );
};

export default PriceSummary;
