import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  username: Scalars['String'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  user: User;
};

export type CreatePostResponse = {
  __typename?: 'CreatePostResponse';
  success: Scalars['Boolean'];
};

export type PostResponse = {
  __typename?: 'PostResponse';
  _id: Scalars['String'];
  body: Scalars['String'];
  author: Scalars['String'];
  roomId: Scalars['String'];
};

export type PostErrorResponse = {
  __typename?: 'PostErrorResponse';
  body: Scalars['String'];
  author: Scalars['String'];
  roomId: Scalars['String'];
  userId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  user: User;
  posts: Array<PostResponse>;
};


export type QueryPostsArgs = {
  input: PostsInput;
};

export type PostsInput = {
  roomId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  signUp: AuthResponse;
  login: AuthResponse;
  createPost: CreatePostResponse;
};


export type MutationSignUpArgs = {
  input: AuthInput;
};


export type MutationLoginArgs = {
  input: AuthInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};

export type AuthInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type CreatePostInput = {
  roomId: Scalars['String'];
  body: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  postCreated: PostResponse;
  postError: PostErrorResponse;
};


export type SubscriptionPostCreatedArgs = {
  input: PostCreatedInput;
};


export type SubscriptionPostErrorArgs = {
  input: PostErrorInput;
};

export type PostCreatedInput = {
  accessToken: Scalars['String'];
  subscribedRoom: Scalars['String'];
};

export type PostErrorInput = {
  accessToken: Scalars['String'];
  userId: Scalars['String'];
};

export type CreatePostMutationVariables = Exact<{
  body: Scalars['String'];
  roomId: Scalars['String'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'CreatePostResponse' }
    & Pick<CreatePostResponse, 'success'>
  ) }
);

export type PostCreatedSubscriptionVariables = Exact<{
  accessToken: Scalars['String'];
  subscribedRoom: Scalars['String'];
}>;


export type PostCreatedSubscription = (
  { __typename?: 'Subscription' }
  & { postCreated: (
    { __typename?: 'PostResponse' }
    & Pick<PostResponse, '_id' | 'body' | 'author' | 'roomId'>
  ) }
);

export type PostErrorSubscriptionVariables = Exact<{
  accessToken: Scalars['String'];
  userId: Scalars['String'];
}>;


export type PostErrorSubscription = (
  { __typename?: 'Subscription' }
  & { postError: (
    { __typename?: 'PostErrorResponse' }
    & Pick<PostErrorResponse, 'body' | 'author' | 'roomId'>
  ) }
);

export type PostsQueryVariables = Exact<{
  roomId: Scalars['String'];
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'PostResponse' }
    & Pick<PostResponse, '_id' | 'body' | 'author' | 'roomId'>
  )> }
);

export type SignUpMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signUp: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'accessToken' | 'refreshToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'username'>
    ) }
  ) }
);

export type SignInMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'accessToken' | 'refreshToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'username'>
    ) }
  ) }
);

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, '_id' | 'username'>
  ) }
);


export const CreatePostDocument = gql`
    mutation CreatePost($body: String!, $roomId: String!) {
  createPost(input: {body: $body, roomId: $roomId}) {
    success
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      body: // value for 'body'
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const PostCreatedDocument = gql`
    subscription PostCreated($accessToken: String!, $subscribedRoom: String!) {
  postCreated(input: {accessToken: $accessToken, subscribedRoom: $subscribedRoom}) {
    _id
    body
    author
    roomId
  }
}
    `;

/**
 * __usePostCreatedSubscription__
 *
 * To run a query within a React component, call `usePostCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePostCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostCreatedSubscription({
 *   variables: {
 *      accessToken: // value for 'accessToken'
 *      subscribedRoom: // value for 'subscribedRoom'
 *   },
 * });
 */
export function usePostCreatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<PostCreatedSubscription, PostCreatedSubscriptionVariables>) {
        return Apollo.useSubscription<PostCreatedSubscription, PostCreatedSubscriptionVariables>(PostCreatedDocument, baseOptions);
      }
export type PostCreatedSubscriptionHookResult = ReturnType<typeof usePostCreatedSubscription>;
export type PostCreatedSubscriptionResult = Apollo.SubscriptionResult<PostCreatedSubscription>;
export const PostErrorDocument = gql`
    subscription PostError($accessToken: String!, $userId: String!) {
  postError(input: {accessToken: $accessToken, userId: $userId}) {
    body
    author
    roomId
  }
}
    `;

/**
 * __usePostErrorSubscription__
 *
 * To run a query within a React component, call `usePostErrorSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePostErrorSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostErrorSubscription({
 *   variables: {
 *      accessToken: // value for 'accessToken'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function usePostErrorSubscription(baseOptions: Apollo.SubscriptionHookOptions<PostErrorSubscription, PostErrorSubscriptionVariables>) {
        return Apollo.useSubscription<PostErrorSubscription, PostErrorSubscriptionVariables>(PostErrorDocument, baseOptions);
      }
export type PostErrorSubscriptionHookResult = ReturnType<typeof usePostErrorSubscription>;
export type PostErrorSubscriptionResult = Apollo.SubscriptionResult<PostErrorSubscription>;
export const PostsDocument = gql`
    query Posts($roomId: String!) {
  posts(input: {roomId: $roomId}) {
    _id
    body
    author
    roomId
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const SignUpDocument = gql`
    mutation SignUp($username: String!, $password: String!) {
  signUp(input: {username: $username, password: $password}) {
    accessToken
    refreshToken
    user {
      _id
      username
    }
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, baseOptions);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($username: String!, $password: String!) {
  login(input: {username: $username, password: $password}) {
    accessToken
    refreshToken
    user {
      _id
      username
    }
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, baseOptions);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const UserDocument = gql`
    query User {
  user {
    _id
    username
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;