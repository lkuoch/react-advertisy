import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "./types";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: CONFIG.vars.base_graphql_endpoint }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    fetchProducts: builder.query<Array<Product>, void>({
      query: () => `/products`,
      providesTags: (products) => [
        { type: "Product" as const, id: "@LIST" },
        ...(products?.map((product) => ({
          type: "Product" as const,
          id: product.id,
        })) || []),
      ],
    }),
  }),
});
