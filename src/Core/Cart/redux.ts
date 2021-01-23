import { CaseReducer, createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";

import { MappedProduct, Product, ProductSelectionType } from "./models";
import type { IRootState } from "@Core/types";

export namespace ICart {
  export interface IState {
    products: Product[];
    mappedProducts: MappedProduct;
  }

  export interface IActions extends SliceCaseReducers<IState> {
    initCart: CaseReducer<IState>;
    handleProductSelection: CaseReducer<IState, PayloadAction<IProductSelectionPayload>>;

    updateProducts: CaseReducer<IState, PayloadAction<Product[]>>;
    updateMappedProducts: CaseReducer<IState, PayloadAction<MappedProduct>>;
  }

  export interface IProductSelectionPayload {
    id: number;
    type: ProductSelectionType;
  }
}

// Slice details
const name = "CART";

const initialState: ICart.IState = {
  products: [],
  mappedProducts: {},
};

const { actions, reducer } = createSlice<ICart.IState, ICart.IActions>({
  name,
  initialState,
  reducers: {
    initCart: (state) => state,
    handleProductSelection: (state) => state,

    updateProducts: (state, { payload }) => {
      state.products = payload;
    },
    updateMappedProducts: (state, { payload }) => {
      state.mappedProducts = payload;
    },
  },
});

const selectors = {
  selectProducts: (state: IRootState) => state[name].products,
  selectMappedProducts: (state: IRootState) => state[name].mappedProducts,
};

export { initialState, actions, reducer, selectors, name };
