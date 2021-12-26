import React from "react";
import { useAtomValue } from "jotai/utils";

import { cartQueryAtom } from "../../features/cart/atoms";

import Description from "./description";
import Price from "./price";
import UserSelection from "./userSelection";

import type { Product } from "../../features/cart/types";

const Table = () => {
  const products = useAtomValue<Product[]>(cartQueryAtom);

  return (
    <div className="p-3">
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
            <tr>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Name</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Description</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Retail Price</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-center">Quantity</div>
              </th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {products.map((product) => (
              <tr>
                <td className="p-2 whitespace-nowrap">
                  <p>{product.name}</p>
                </td>

                <td className="p-2 whitespace-nowrap">
                  <Description product={product} />
                </td>
                <td className="p-2 whitespace-nowrap">
                  <Price product={product} />
                </td>
                <td className="p-2 whitespace-nowrap">
                  <UserSelection product={product} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
