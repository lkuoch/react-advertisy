import { atomWithQuery } from "jotai/query";

import { Product } from "./types";

export const cartQueryAtom = atomWithQuery<Product[], typeof Error>(() => ({
  queryKey: ["cart"],
  queryFn: () =>
    fetch(`${CONFIG.vars.graphql_endpoint}/products`)
      .then((response) => response.json())
      .catch((error) => Promise.reject(error)),
}));
