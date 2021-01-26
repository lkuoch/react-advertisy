import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";

import { Product, ProductSelectionPayload } from "./models";

// Slice details
const name = "CART";

const adapter = createEntityAdapter<Product>({
  selectId: (product) => product.id,
  sortComparer: false,
});

const slice = adapter.getSelectors<IRootState>((state) => state[name]);

const { actions, reducer } = createSlice({
  name,
  initialState: adapter.getInitialState({}),
  reducers: {
    initCart: (state) => state,
    handleProductSelection: (
      state,
      _action: PayloadAction<ProductSelectionPayload>
    ) => state,

    // CRUD
    addProduct: adapter.addOne,
    addProducts: adapter.addMany,
  },
});

const selectors = {
  selectProductsState: (state: IRootState) => ({
    ids: slice.selectIds(state),
    entities: slice.selectAll(state),
  }),
  selectProducts: (state: IRootState) => slice.selectAll(state),
  selectProductIds: (state: IRootState) => slice.selectIds(state),
};

export { actions, reducer, selectors, name };
