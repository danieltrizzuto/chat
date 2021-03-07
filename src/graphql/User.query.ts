import gql from "graphql-tag";

export const User = gql`
  query User {
    user {
      _id
      username
    }
  }
`;

export {};
