import { atomWithQuery } from "jotai/query";

import { Product } from "./types";

export const cartQueryAtom = atomWithQuery<Product[], typeof Error>(() => ({
  queryKey: ["cart"],
  queryFn: async () =>
    fetch(`${CONFIG.vars.graphql_endpoint}/products`)
      .then((response) => response.json())
      .catch((error) => {
        return Promise.reject(error);
      }),
}));
