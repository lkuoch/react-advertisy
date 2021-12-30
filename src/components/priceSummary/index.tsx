import React from "react";

import Prices from "./prices";

const PriceSummary = () => {
  return (
    <React.Suspense fallback={null}>
      <Prices />
    </React.Suspense>
  );
};

export default PriceSummary;
