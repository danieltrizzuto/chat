import gql from "graphql-tag";

export const Posts = gql`
  query Posts($roomId: String!) {
    posts(input: { roomId: $roomId }) {
      _id
      body
      author
    }
  }
`;
