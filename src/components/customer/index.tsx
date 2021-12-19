import * as React from "react";

import UsersIcon from "@heroicons/react/outline/UsersIcon";
import Loader from "../common/loader";
import Customers from "./customers";

const Customer = () => {
  return (
    <aside className="w-72">
      <div className="flex h-20 items-center justify-center shadow-md text-2xl text-orange-400">
        <UsersIcon className="h-20 w-20 p-2" />
        <h1 className="uppercase">Customers</h1>
      </div>

      <React.Suspense fallback={<Loader />}>
        <Customers />
      </React.Suspense>
    </aside>
  );
};

export default Customer;
