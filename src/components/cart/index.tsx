import * as React from "react";

import TableSection from "./table";
import Loader from "../common/loader";

const Cart = () => (
  <React.Suspense fallback={<Loader />}>
    <TableSection />
  </React.Suspense>
);

export default Cart;
