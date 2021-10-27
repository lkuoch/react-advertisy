import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Customer } from "./types";

export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: fetchBaseQuery({ baseUrl: CONFIG.vars.base_graphql_endpoint }),
  tagTypes: ["customer"],
  endpoints: (builder) => ({
    fetchCustomers: builder.query<Array<Customer>, void>({
      query: () => `/customers`,
      providesTags: (customers) => [
        { type: "customer" as const, id: "@LIST" },
        ...(customers?.map((customer) => ({
          type: "customer" as const,
          id: customer.id,
        })) ?? []),
      ],
    }),
  }),
});
