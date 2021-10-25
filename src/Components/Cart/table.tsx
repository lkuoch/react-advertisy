import React from "react";
import { useSelector } from "react-redux";

import { selectors } from "@Core/Cart/redux";

import Description from "./description";
import Price from "./price";
import UserSelection from "./userSelection";

export default function Table() {
  const hasLoaded = useSelector(selectors.selectHasLoaded);
  const items = useSelector(selectors.selectAll);

  if (!hasLoaded) {
    return (
      <div className="ui segment" style={{ height: "25vh" }}>
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading</div>
        </div>
      </div>
    );
  }

  return (
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
        {items.map((item) => (
          <tr key={item.id}>
            <td data-label="name">{item.Name}</td>

            <td data-label="description">{<Description item={item} />}</td>

            <td data-label="retail-price">{<Price item={item} />}</td>

            <td data-label="select-quantity">{<UserSelection item={item} />}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
