import { createSelector } from "@reduxjs/toolkit";
import { cartEntities } from "./state";
import { RootState } from "../../types";

const entitySelectors = cartEntities.getSelectors(({ cart }: RootState) => cart);

const selectCurrentProductPrice = (productId: string) =>
  createSelector([(state) => entitySelectors.selectById(state, productId)], (product) => product?.price ?? 0);

export default {
  entitySelectors,
  selectCurrentProductPrice,
};
