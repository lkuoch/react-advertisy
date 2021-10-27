import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "./types";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: CONFIG.vars.base_graphql_endpoint }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    fetchProducts: builder.query<Array<Product>, void>({
      query: () => `/products`,
      providesTags: (products) => [
        { type: "product" as const, id: "@LIST" },
        ...(products?.map((product) => ({
          type: "product" as const,
          id: product.id,
        })) ?? []),
      ],
    }),
  }),
});
