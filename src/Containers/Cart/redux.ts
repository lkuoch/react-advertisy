import { CaseReducer, createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";

import { MappedProduct, Product, ProductSelectionType } from "./models";
import { Offers } from "@Containers/Customer/models";
import type { IConfig, ICustomer, IRootState } from "src/types";

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

  export interface IStateProps {
    appConfig: IConfig;
    products: Product[];
    currentCustomer: number;
    customerSelections: ICustomer.ICustomerSelection;
    currentOffers?: Offers;
  }

  export interface IDispatchProps {
    handleProductSelection: (payload: IProductSelectionPayload) => void;
  }

  export interface IOwnProps {}

  export interface IProps extends IStateProps, IDispatchProps, IOwnProps {}

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
