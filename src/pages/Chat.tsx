import { useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { localStorageKeys } from "../common/constants/local-storage-keys";
import { ChatItems } from "../components/ChatList";
import { UserContext } from "../contexts/UserContext";
import {
  CreatePostMutation,
  CreatePostMutationVariables,
  PostCreatedSubscription,
  PostCreatedSubscriptionVariables,
  PostErrorSubscription,
  PostErrorSubscriptionVariables,
  PostsQuery,
  PostsQueryVariables,
} from "../generated/graphql";
import { CreatePost } from "../graphql/CreatePost.mutation";
import { PostCreated } from "../graphql/PostCreated.subscription";
import { PostError } from "../graphql/PostError.subscription";
import { Posts } from "../graphql/Posts.query";

const ROOM_IDS = ["1", "2"];

export const ChatPage = () => {
  const { setUser, user } = UserContext.useContainer();

  const [currentRoomId, setCurrentRoomId] = useState(ROOM_IDS[0]);
  const [message, setMessage] = useState("");
  const [shouldShowError, setShouldShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const unsubscribeFromRoomMethodRef = useRef<any>();

  const { data: postErrorData } = useSubscription<
    PostErrorSubscription,
    PostErrorSubscriptionVariables
  >(PostError, {
    variables: {
      accessToken:
        localStorage.getItem(localStorageKeys.ACCESS_TOKEN_KEY) || "",
      userId: user?._id || "",
    },
  });

  const { data: postsData, loading: postsLoading, subscribeToMore } = useQuery<
    PostsQuery,
    PostsQueryVariables
  >(Posts, {
    variables: { roomId: currentRoomId },
    fetchPolicy: "network-only",
  });
  const [createPost, { loading: createPostLoading }] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(CreatePost);

  const postsToShow = postsData?.posts.filter(
    (p) => p.roomId === currentRoomId
  );

  useEffect(() => {
    if (postErrorData && postErrorData.postError) {
      const { author, body, roomId } = postErrorData.postError;
      setErrorMessage(
        `${author}: Failed to run "${body}" on room ${roomId}. Please check the stock ticker.`
      );
      setShouldShowError(true);
      setTimeout(() => setShouldShowError(false), 8000);
    }
  }, [postErrorData]);

  const subscribeToMorePosts = useCallback(() => {
    if (unsubscribeFromRoomMethodRef.current) {
      unsubscribeFromRoomMethodRef.current();
    }
    unsubscribeFromRoomMethodRef.current = subscribeToMore<
      PostCreatedSubscription,
      PostCreatedSubscriptionVariables
    >({
      variables: {
        accessToken:
          localStorage.getItem(localStorageKeys.ACCESS_TOKEN_KEY) || "",
        subscribedRoom: currentRoomId,
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
    });
  }, [subscribeToMore, currentRoomId]);

  useEffect(() => {
    subscribeToMorePosts();
  }, [subscribeToMorePosts, currentRoomId]);

  const handleLogout = async () => {
    localStorage.clear();
    setUser(undefined);
  };

  const handleSendMessage = async () => {
    await createPost({
      variables: { body: message, roomId: currentRoomId },
    }).catch(console.log);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleRoomChange = (selectedId: string) => {
    setCurrentRoomId(selectedId);
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
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div>
            {ROOM_IDS.map((rId) => (
              <Button
                key={rId}
                onClick={() => handleRoomChange(rId)}
                variant="text"
                style={{
                  fontWeight: currentRoomId === rId ? "bold" : "normal",
                }}
              >
                Room {rId}
              </Button>
            ))}
          </div>
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
        <ChatItems items={postsToShow || []} />
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
          onKeyDown={handleKeyDown}
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
      {shouldShowError && (
        <Alert
          severity="warning"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => setShouldShowError(false)}
            >
              OK
            </Button>
          }
        >
          {errorMessage}
        </Alert>
      )}
    </div>
  );
};
