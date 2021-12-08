import { atomWithQuery } from "jotai/query";

export const cartQueryAtom = atomWithQuery(() => ({
  queryKey: ["cart"],
  queryFn: async () => fetch(`${CONFIG.vars.graphql_endpoint}/products`).then((response) => response.json()),
}));
