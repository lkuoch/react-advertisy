import { gql } from "graphql-request";

import { gqlClient } from "../../store/api";
import type { Customer } from "../../types";

const TAG = "Customers" as const;

const customerApi = gqlClient
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      fetchCustomers: builder.query<Customer[], void>({
        query: () => ({
          document: gql`
            query FetchCustomers {
              Customers {
                id
                name
              }
            }
          `,
        }),
        transformResponse: (response: { Customers: Customer[] }) => response.Customers,
        providesTags: (customers = []) => [
          TAG,
          ...customers.map(({ id }) => ({
            id,
            type: TAG,
          })),
        ],
      }),
    }),
  });

export default customerApi;
