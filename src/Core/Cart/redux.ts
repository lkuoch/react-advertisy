import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";

import { Product, ProductSelectionPayload } from "./models";

interface IState {
  state: ICartState;
}

export interface ICartState {}

// Slice details
const name = "CART";

const adapter = createEntityAdapter<Product>({
  selectId: (product) => product.id,
  sortComparer: false,
});

const selector = adapter.getSelectors<IRootState>((state) => state[name]);

const initialState = adapter.getInitialState<IState>({
  state: {},
});

const { actions, reducer } = createSlice({
  name,
  initialState,
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

export { initialState, actions, reducer, selectors, name };
