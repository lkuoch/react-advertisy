import React from "react";

import Prices from "./prices";
import Loader from "../common/loader";

const PriceSummary = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <Prices />
    </React.Suspense>
  );
};

export default PriceSummary;
