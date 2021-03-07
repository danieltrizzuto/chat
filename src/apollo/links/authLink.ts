import { setContext } from "@apollo/link-context";
import { localStorageKeys } from "./../../common/constants/local-storage-keys";

export const authLink = setContext(async (_, { headers }) => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN_KEY);

  if (!accessToken) {
    return { headers };
  }

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${accessToken}`,
    },
  };
});
