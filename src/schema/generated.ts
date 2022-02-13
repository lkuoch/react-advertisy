export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Customer = Node & {
  readonly __typename?: "Customer";
  /** Customer Id */
  readonly id: Scalars["ID"];
  /** Name of customer */
  readonly name: Scalars["String"];
  /** Offers */
  readonly offers: ReadonlyArray<Maybe<Offer>>;
};

export type Node = {
  readonly id: Scalars["ID"];
};

export type Offer = Node & {
  readonly __typename?: "Offer";
  /** Product Id */
  readonly id: Scalars["ID"];
  /** Product offers for customer */
  readonly offers: ReadonlyArray<ProductOffer>;
};

export type OfferInput = {
  readonly customerId: Scalars["ID"];
};

export type Product = Node & {
  readonly __typename?: "Product";
  /** Description of product */
  readonly description: Scalars["String"];
  /** Product Id */
  readonly id: Scalars["ID"];
  /** Name of product */
  readonly name: Scalars["String"];
  /** Retail price */
  readonly price: Scalars["Float"];
};

export type ProductOffer = {
  readonly __typename?: "ProductOffer";
  /** Type of product offer */
  readonly type: ProductOfferType;
  /** Values related to calculating productg offer */
  readonly values: ReadonlyArray<Scalars["Int"]>;
};

export const enum ProductOfferType {
  NewPrice = "NewPrice",
  XyDeal = "XYDeal",
}

export type Query = {
  readonly __typename?: "Query";
  /** List of customers */
  readonly Customers: ReadonlyArray<Maybe<Customer>>;
  /** List of products */
  readonly Products: ReadonlyArray<Maybe<Product>>;
};

export type FetchProductsQueryVariables = Exact<{ [key: string]: never }>;

export type FetchProductsQuery = {
  readonly __typename?: "Query";
  readonly Products: ReadonlyArray<{
    readonly __typename?: "Product";
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly price: number;
  } | null>;
};

export type FetchCustomersQueryVariables = Exact<{ [key: string]: never }>;

export type FetchCustomersQuery = {
  readonly __typename?: "Query";
  readonly Customers: ReadonlyArray<{
    readonly __typename?: "Customer";
    readonly id: string;
    readonly name: string;
  } | null>;
};
