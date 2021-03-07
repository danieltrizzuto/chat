import gql from "graphql-tag";

export const SignIn = gql`
  mutation SignIn($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      accessToken
      refreshToken
      user {
        _id
        username
      }
    }
  }
`;
