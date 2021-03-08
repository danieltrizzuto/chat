import gql from "graphql-tag";

export const PostError = gql`
  subscription PostError($accessToken: String!, $userId: String!) {
    postError(input: { accessToken: $accessToken, userId: $userId }) {
      body
      author
      roomId
    }
  }
`;

export {};
