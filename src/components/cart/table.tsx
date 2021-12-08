import React from "react";
import { useAtomValue } from "jotai/utils";

import { cartQueryAtom } from "@features/cart/atom";

import Loader from "@components/common/loader";
import Description from "./description";
import Price from "./price";
import UserSelection from "./userSelection";
import { Product } from "@features/cart/types";

const Table = () => {
  const products = useAtomValue<Product[]>(cartQueryAtom);

  return (
    <React.Suspense fallback={<Loader />}>
      <table className="ui celled table">
        <thead>
          <tr>
            <th className="two wide">Name</th>
            <th className="nine wide">Description</th>
            <th className="two wide">Retail Price</th>
            <th className="three wide">Quantity</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td data-label="name">{product.name}</td>

              <td data-label="description">
                <Description product={product} />
              </td>

              <td data-label="retail-price">
                <Price product={product} />
              </td>

              <td data-label="select-quantity">
                <UserSelection product={product} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Suspense>
  );
};

export default Table;
