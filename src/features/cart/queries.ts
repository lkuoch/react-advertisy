import { gql } from "graphql-request";

export const FetchProducts = gql`
  query FetchProducts {
    Products {
      id
      name
      description
      price
    }
  }
`;
