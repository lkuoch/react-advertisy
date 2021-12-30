import * as React from "react";

import TableSection from "./table";
import Loader from "../common/loader";

export default () => (
  <React.Suspense fallback={<Loader />}>
    <TableSection />
  </React.Suspense>
);
