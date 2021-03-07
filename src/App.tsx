import { useMutation } from "@apollo/client";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import React, { useState } from "react";
import "./App.css";
import {
  SignInMutation,
  SignInMutationVariables,
  SignUpMutation,
  SignUpMutationVariables,
} from "./generated/graphql";
import { SignIn } from "./graphql/Signin.mutation";
import { SignUp } from "./graphql/SignUp.mutation";
import logo from "./logo.svg";

function App() {
  const [signUp, { loading: signUpLoading }] = useMutation<
    SignUpMutation,
    SignUpMutationVariables
  >(SignUp);
  const [login, { loading: loginLoading }] = useMutation<
    SignInMutation,
    SignInMutationVariables
  >(SignIn);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await login({ variables: { username, password } }).catch(
      console.log
    );
    console.log({ response });
  };

  const handleSignUp = async () => {
    const response = await signUp({ variables: { username, password } }).catch(
      console.log
    );
    console.log({ response });
  };

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
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
                style={{ marginRight: 6 }}
                onClick={handleLogin}
              >
                Sign In
              </Button>
              <Button
                color="secondary"
                variant="contained"
                style={{ marginLeft: 6 }}
                onClick={handleSignUp}
              >
                Sign Up
              </Button>{" "}
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
