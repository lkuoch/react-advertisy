import { customerQueryAtom } from "@features/customer/atom";
import { atomWithQuery } from "jotai/query";

export const cartQueryAtom = atomWithQuery((get) => ({
  queryKey: ["cart"],
  queryFn: async () => {
    // get(customerQueryAtom);

    return fetch(`${CONFIG.vars.graphql_endpoint}/products`).then((response) => response.json());
  },
}));
