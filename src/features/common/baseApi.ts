import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: CONFIG.vars.graphql_endpoint }),
  endpoints: () => ({}),
});

export default baseApi;
