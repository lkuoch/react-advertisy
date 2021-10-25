import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Customer } from "./models";

export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: fetchBaseQuery({ baseUrl: CONFIG.vars.base_graphql_endpoint }),
  tagTypes: ["Customer"],
  endpoints: (builder) => ({
    fetchCustomers: builder.query<Array<Customer>, void>({
      query: () => `/customers`,
      providesTags: (customers) => [
        { type: "Customer" as const, id: "@LIST" },
        ...(customers?.map((customer) => ({
          type: "Customer" as const,
          id: customer.id,
        })) || []),
      ],
    }),
  }),
});
