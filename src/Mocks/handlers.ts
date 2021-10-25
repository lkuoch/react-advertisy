import { rest } from "msw";
import { customers } from "./Data/customers.json";
import { products } from "./Data/products.json";

const BASE_URL = CONFIG.vars.base_graphql_endpoint;

export const handlers = [
  rest.get(`${BASE_URL}/customers`, async (_, res, ctx) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return res(ctx.status(200), ctx.json(customers));
  }),
  rest.get(`${BASE_URL}/products`, async (_, res, ctx) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return res(ctx.status(200), ctx.json(products));
  }),
];
