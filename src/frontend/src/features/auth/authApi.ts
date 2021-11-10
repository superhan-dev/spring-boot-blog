import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  id: number,
  username: string,
  email: string,
  password: string
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/auth" }),
  tagTypes: [],
  endpoints: (build) => ({
    // Omit을 사용하여 User interface에서 id값을 생략할 수 있다.
    register: build.mutation<User, Omit<User, 'id'>>({
      query: (body) => ({
        url: `register`,
        method: 'POST',
        body,
      }),
      // invalidatesTags: ['Users']
    }),
    login: build.mutation<User, Omit<User, 'id' | 'email'>>({
      query: (body) => ({
        url: `login`,
        method: 'POST',
        body
      })
    })
  })
})

/**
 * Hooks naming rules
 * - get은 useRegisteUser Query를 붙인다.
 * - post는 useRegistUser Mutation을 붙인다.
 * - patch | put | delete는 useRegistUser Mutation을 붙인다.
 */
export const { useRegisterMutation, useLoginMutation } = authApi;
export const { endpoints, reducerPath, reducer, middleware } = authApi;