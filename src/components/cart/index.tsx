import * as React from "react";

import Table from "./table";
import Loader from "../common/loader";

const Cart = () => {
  return (
    <section className="antialiased text-gray-600 px-4">
      <div className="flex flex-col justify-center h-full">
        <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Customers</h2>
          </header>

          <React.Suspense fallback={<Loader />}>
            <Table />
          </React.Suspense>
        </div>
      </div>
    </section>
  );
};

export default Cart;
