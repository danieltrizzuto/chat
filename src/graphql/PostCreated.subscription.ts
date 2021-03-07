import gql from "graphql-tag";

export const PostCreated = gql`
  subscription PostCreated($accessToken: String!, $subscribedRoom: String!) {
    postCreated(
      input: { accessToken: $accessToken, subscribedRoom: $subscribedRoom }
    ) {
      _id
      body
      author
      roomId
    }
  }
`;

export {};
