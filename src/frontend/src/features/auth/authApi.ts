import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import {RootState} from '../../states/store';


export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar?:string;
  role?:string;
}

export interface UserResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "http://localhost:8080/auth",
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).auth.token
  
    //   // If we have a token set in state, let's assume that we should be passing it.
    //   if (token) {
    //     headers.set('authorization', `Bearer ${token}`)
    //   }
  
    //   return headers
    // },
  }),
 
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
    login: build.mutation<UserResponse,LoginRequest>({
      query: (credential) => ({
        url: `authenticate`,
        method: 'POST',
        body:credential,
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
// export const { endpoints, reducerPath, reducer, middleware } = authApi;