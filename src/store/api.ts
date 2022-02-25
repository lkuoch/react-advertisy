import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";

export const gqlClient = createApi({
  reducerPath: "gqlClient",
  baseQuery: graphqlRequestBaseQuery({
    url: CONFIG.vars.gqlEndpoint,
  }),
  endpoints: () => ({}),
});
