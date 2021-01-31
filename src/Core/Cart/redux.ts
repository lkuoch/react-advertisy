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

const selector = adapter.getSelectors<IRootState>((state) => state[name]);

interface IState {
  state: ICartState;
}

export interface ICartState {}

const { actions, reducer } = createSlice({
  name,
  initialState: adapter.getInitialState<IState>({
    state: {},
  }),
  reducers: {
    initCart: (slice) => slice,
    handleProductSelection: (
      slice,
      _action: PayloadAction<ProductSelectionPayload>
    ) => slice,

    // CRUD
    addProduct: adapter.addOne,
    addProducts: adapter.addMany,
  },
});

const selectors = {
  selectState: (state: IRootState) => state[name].state,

  selectAdapted: (state: IRootState) => ({
    ids: selector.selectIds(state),
    entities: selector.selectAll(state),
  }),
};

export { actions, reducer, selectors, name };
