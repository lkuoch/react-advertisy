import { gql } from "graphql-request";

export const FetchCustomers = gql`
  query FetchCustomers {
    Customers {
      id
      name
    }
  }
`;
