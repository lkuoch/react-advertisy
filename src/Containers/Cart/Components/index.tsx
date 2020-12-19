import React from "react";

import Header from "./header";
import Description from "./description";
import Price from "./price";
import UserSelection from "./userSelection";
import type { ICart } from "@AppTypes";

export default function Cart(props: ICart.IProps) {
  return (
    <div id="cart">
      <div className="center-panel ui segment">
        <Header />

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
            {props.products.map((x) => (
              <tr key={x.id}>
                <td data-label="name">{x.Name}</td>

                <td data-label="description">
                  <Description {...props} item={x} />
                </td>

                <td data-label="retail-price">
                  <Price {...props} item={x} />
                </td>

                <td data-label="select-quantity">
                  <UserSelection {...props} item={x} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
