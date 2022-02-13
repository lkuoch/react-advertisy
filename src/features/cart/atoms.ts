import { atomWithQuery } from "jotai/query";
import { request } from "graphql-request";

import { FetchProducts } from "./queries";

import { Product } from "../../schema/generated";

export const cartQueryAtom = atomWithQuery<Product[], typeof Error>(() => ({
  queryKey: ["cart"],
  queryFn: () =>
    request(CONFIG.vars.gqlEndpoint, FetchProducts)
      .then(({ Products }) => Products)
      .catch((err) => Error(err)),
}));
