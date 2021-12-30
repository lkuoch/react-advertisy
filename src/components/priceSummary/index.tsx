import React from "react";

import Prices from "./prices";

export default () => {
  return (
    <React.Suspense fallback={null}>
      <Prices />
    </React.Suspense>
  );
};
