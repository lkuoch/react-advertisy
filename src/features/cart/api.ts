import { gql } from "graphql-request";

import { gqlClient } from "../../store/api";
import { Product } from "../../types";

const TAG = "Products" as const;

const cartApi = gqlClient
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      fetchProducts: builder.query<Product[], void>({
        query: () => ({
          document: gql`
            query FetchProducts {
              Products {
                id
                name
                description
                price
              }
            }
          `,
        }),
        transformResponse: (response: { Products: Product[] }) => response.Products,
        providesTags: (products = []) => [
          TAG,
          ...products.map(({ id }) => ({
            type: TAG,
            id,
          })),
        ],
      }),
    }),
  });

export default cartApi;
