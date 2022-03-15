import { useMutation } from "@apollo/client";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { localStorageKeys } from "../common/constants/local-storage-keys";
import { UserContext } from "../contexts/UserContext";
import {
  AuthResponse,
  SignInMutation,
  SignInMutationVariables,
  SignUpMutation,
  SignUpMutationVariables,
} from "../generated/graphql";
import { SignIn } from "../graphql/Signin.mutation";
import { SignUp } from "../graphql/SignUp.mutation";
import logo from "../logo.svg";

export const AuthPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, loading: userLoading } = UserContext.useContainer();

  const [signUp, { loading: signUpLoading }] = useMutation<
    SignUpMutation,
    SignUpMutationVariables
  >(SignUp);
  const [login, { loading: loginLoading }] = useMutation<
    SignInMutation,
    SignInMutationVariables
  >(SignIn);

  const handleAuthCompleted = (authResponse: AuthResponse) => {
    localStorage.setItem(
      localStorageKeys.ACCESS_TOKEN_KEY,
      authResponse.accessToken
    );
    localStorage.setItem(
      localStorageKeys.REFRESH_TOKEN_KEY,
      authResponse.refreshToken
    );
    setUser(authResponse.user);
  };

  const handleLogin = async () => {
    const response = await login({ variables: { username, password } }).catch(
      console.log
    );
    if (!response || !response.data) {
      return;
    }
    handleAuthCompleted(response.data.login);
  };

  const handleSignUp = async () => {
    const response = await signUp({ variables: { username, password } }).catch(
      console.log
    );
    if (!response || !response.data) {
      return;
    }
    handleAuthCompleted(response.data.signUp);
  };

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  if (userLoading) {
    <CircularProgress />;
  }

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <TextField
        id="standard-basic"
        label="Username"
        value={username}
        onChange={handleChangeUsername}
      />
      <TextField
        id="standard-basic"
        label="Password"
        type="password"
        value={password}
        onChange={handleChangePassword}
      />
      <div style={{ flexDirection: "row", marginTop: 24 }}>
        {signUpLoading || loginLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Button
              color="primary"
              variant="contained"
              disabled={!username || !password}
              style={{ marginRight: 6 }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Button
              color="secondary"
              variant="contained"
              disabled={!username || !password}
              style={{ marginLeft: 6 }}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </>
  );
};
