import { useMutation, useQuery } from "@apollo/client";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { localStorageKeys } from "./common/constants/local-storage-keys";
import { usePrevious } from "./common/hooks/usePrevious";
import { ChatItems } from "./components/ChatList";
import { UserContext } from "./contexts/UserContext";
import {
  AuthResponse,
  CreatePostMutation,
  CreatePostMutationVariables,
  PostCreatedSubscription,
  PostCreatedSubscriptionVariables,
  PostsQuery,
  PostsQueryVariables,
  SignInMutation,
  SignInMutationVariables,
  SignUpMutation,
  SignUpMutationVariables,
} from "./generated/graphql";
import { CreatePost } from "./graphql/CreatePost.mutation";
import { PostCreated } from "./graphql/PostCreated.subscription";
import { Posts } from "./graphql/Posts.query";
import { SignIn } from "./graphql/Signin.mutation";
import { SignUp } from "./graphql/SignUp.mutation";
import logo from "./logo.svg";

function App() {
  const { setUser, user, loading: userLoading } = UserContext.useContainer();
  const { data: postsData, loading: postsLoading, subscribeToMore } = useQuery<
    PostsQuery,
    PostsQueryVariables
  >(Posts, {
    variables: { roomId: "1" },
  });
  const [signUp, { loading: signUpLoading }] = useMutation<
    SignUpMutation,
    SignUpMutationVariables
  >(SignUp);
  const [login, { loading: loginLoading }] = useMutation<
    SignInMutation,
    SignInMutationVariables
  >(SignIn);
  const [createPost, { loading: createPostLoading }] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(CreatePost);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const previousUser = usePrevious(user);

  const posts = postsData?.posts;

  const subscribeToMorePosts = useCallback(
    () =>
      subscribeToMore<
        PostCreatedSubscription,
        PostCreatedSubscriptionVariables
      >({
        variables: {
          accessToken:
            localStorage.getItem(localStorageKeys.ACCESS_TOKEN_KEY) || "",
        },
        document: PostCreated,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }
          const newPost = subscriptionData.data.postCreated;
          const previousPosts = prev.posts || [];

          const newPosts = [...previousPosts, newPost];

          return {
            __typename: "Query",
            posts:
              newPosts.length > 50
                ? newPosts.slice(1, newPosts.length)
                : newPosts,
          };
        },
        onError: (e) => console.log({ e }),
      }),
    [subscribeToMore]
  );

  useEffect(() => {
    if (!previousUser && user) {
      subscribeToMorePosts();
    }
  }, [user, previousUser, subscribeToMorePosts]);

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

  const handleLogout = async () => {
    console.log("aaaa");

    localStorage.clear();
    setUser(undefined);
  };

  const handleSendMessage = () => {
    createPost({
      variables: { body: message, roomId: "1" },
    }).catch(console.log);
  };

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const renderAuth = () => {
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
              </Button>
            </>
          )}
        </div>
      </>
    );
  };

  const renderChat = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "500px",
          width: "60%",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={handleLogout} variant="text">
            Sair
          </Button>
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: "#9fa1bb4d",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            maxHeight: "60vh",
          }}
        >
          <ChatItems items={posts || []} />
        </div>
        <div
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-end",
            display: "flex",
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 8,
          }}
        >
          <TextField
            style={{ width: "100%" }}
            id="standard-basic"
            label="Message"
            value={message}
            onChange={handleMessageChange}
          />
          {createPostLoading ? (
            <CircularProgress />
          ) : (
            <Button
              color="primary"
              variant="contained"
              style={{ marginLeft: 24 }}
              onClick={handleSendMessage}
            >
              Send
            </Button>
          )}
        </div>
      </div>
    );
  };

  if (userLoading || postsLoading) {
    return (
      <div className="App">
        <CircularProgress />
      </div>
    );
  }

  return <div className="App">{user ? renderChat() : renderAuth()}</div>;
}

export default App;
