import gql from "graphql-tag";

export const PostCreated = gql`
  subscription PostCreated($accessToken: String!) {
    postCreated(input: { accessToken: $accessToken }) {
      _id
      body
      author
    }
  }
`;

export {};
