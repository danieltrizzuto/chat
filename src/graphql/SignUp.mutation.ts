import gql from "graphql-tag";

export const SignUp = gql`
  mutation SignUp($username: String!, $password: String!) {
    signUp(input: { username: $username, password: $password }) {
      accessToken
      refreshToken
      user {
        _id
        username
      }
    }
  }
`;
