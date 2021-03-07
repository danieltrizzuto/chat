import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { localStorageKeys } from "../common/constants/local-storage-keys";
import { usePrevious } from "../common/hooks/usePrevious";
import { ChatItems } from "../components/ChatList";
import { UserContext } from "../contexts/UserContext";
import {
  CreatePostMutation,
  CreatePostMutationVariables,
  PostCreatedSubscription,
  PostCreatedSubscriptionVariables,
  PostsQuery,
  PostsQueryVariables,
} from "../generated/graphql";
import { CreatePost } from "../graphql/CreatePost.mutation";
import { PostCreated } from "../graphql/PostCreated.subscription";
import { Posts } from "../graphql/Posts.query";

export const ChatPage = () => {
  const { setUser, user } = UserContext.useContainer();

  const { data: postsData, loading: postsLoading, subscribeToMore } = useQuery<
    PostsQuery,
    PostsQueryVariables
  >(Posts, {
    variables: { roomId: "1" },
  });
  const [createPost, { loading: createPostLoading }] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(CreatePost);

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

  const handleLogout = async () => {
    localStorage.clear();
    setUser(undefined);
  };

  const handleSendMessage = () => {
    createPost({
      variables: { body: message, roomId: "1" },
    }).catch(console.log);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  if (postsLoading) {
    return <CircularProgress />;
  }

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Typography component="span" variant="h5" color="textPrimary">
            {user?.username || ""}
          </Typography>
          <Button
            onClick={handleLogout}
            variant="text"
            style={{ marginLeft: 8 }}
          >
            Logout
          </Button>
        </div>
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
