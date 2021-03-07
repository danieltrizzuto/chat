import gql from "graphql-tag";

export const CreatePost = gql`
  mutation CreatePost($body: String!, $roomId: String!) {
    createPost(input: { body: $body, roomId: $roomId }) {
      success
    }
  }
`;
