import { WebSocketLink } from "@apollo/client/link/ws";

export const wsLink = new WebSocketLink({
  uri: "ws://localhost:4100/graphql",
  options: {
    reconnect: true,
  },
});
