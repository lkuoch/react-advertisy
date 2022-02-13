import { rest, graphql, setupWorker } from "msw";

import { FetchCustomersQuery, FetchProductsQuery, ProductOfferType } from "../src/schema/generated";
import customers from "./data/customers";

const BASE_URL = CONFIG.vars.baseEndpoint;
const baseLink = graphql.link(CONFIG.vars.gqlEndpoint);

const Products = [
  {
    id: "fdc697e8-dec8-4c67-ba5c-23b23a9ce21a",
    name: "Classic Ad",
    description: "Offers the most basic level of advertisement",
    price: 269.99,
  },
  {
    id: "2258da74-7a25-46fd-b2d3-dacfe30464ce",
    name: "Stand out Ad",
    description: "Allows advertisers to use a company logo and use a longer presentation text",
    price: 322.99,
  },
  {
    id: "01562650-3000-42b7-9147-56822ed009fc",
    name: "Premium Ad",
    description:
      "Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility",
    price: 394.99,
  },
];

const Customers = [
  {
    id: "f5758372-9329-4ed7-8cd3-4304b545b6e0",
    name: "Default",
    offers: [],
  },
  {
    id: "c00086bf-9a9e-4793-bac1-8055e1b486ff",
    name: "SecondBite",
    offers: [
      {
        id: "fdc697e8-dec8-4c67-ba5c-23b23a9ce21a",
        offers: [
          {
            type: ProductOfferType.XyDeal,
            values: [3, 2],
          },
        ],
      },
    ],
  },
  {
    id: "6646e172-037e-47cd-a233-ba30b0582f82",
    name: "Axil Coffee Roasters",
    offers: [
      {
        id: "2258da74-7a25-46fd-b2d3-dacfe30464ce",
        offers: [
          {
            type: ProductOfferType.NewPrice,
            values: [299.99],
          },
        ],
      },
    ],
  },
  {
    id: "a0bbe0c4-bafe-4043-a455-a3a54bdedc8b",
    name: "MYER",
    offers: [
      {
        id: "2258da74-7a25-46fd-b2d3-dacfe30464ce",
        offers: [
          {
            type: ProductOfferType.XyDeal,
            values: [5, 4],
          },
        ],
      },
      {
        id: "01562650-3000-42b7-9147-56822ed009fc",
        offers: [
          {
            type: ProductOfferType.NewPrice,
            values: [389.99],
          },
        ],
      },
    ],
  },
];

const handlers = [
  rest.get(`${BASE_URL}/customers`, async (_, res, ctx) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return res(ctx.status(200), ctx.json(customers));
  }),
  rest.get(`${BASE_URL}/products`, async (_, res, ctx) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return res(ctx.status(200), ctx.json(Products));
  }),
  baseLink.query<FetchCustomersQuery>("FetchCustomers", (_req, res, ctx) => {
    return res(
      ctx.data({
        Customers,
      })
    );
  }),
  baseLink.query<FetchProductsQuery>("FetchProducts", (_req, res, ctx) => {
    return res(ctx.data({ Products }));
  }),
];

export const worker = setupWorker(...handlers);
