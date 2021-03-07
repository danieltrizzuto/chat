import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import { usePrevious } from "../common/hooks/usePrevious";
import { User as IUser, UserQuery } from "../generated/graphql";
import { User } from "../graphql/User.query";

const useCurrentUser = () => {
  const { data, loading } = useQuery<UserQuery>(User);
  const [user, setUser] = useState<IUser | undefined>();

  const fetchedUser = data?.user;
  const previousUser = usePrevious(fetchedUser);

  useEffect(() => {
    if (!previousUser && fetchedUser) {
      setUser(fetchedUser);
    }
  }, [previousUser, fetchedUser]);

  return {
    loading,
    user,
    setUser,
  };
};

export const UserContext = createContainer(useCurrentUser);
