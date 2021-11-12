import { createSlice } from '@reduxjs/toolkit'
import type { User } from './authApi'
import type { RootState } from '../../states/store'
import {authApi} from './authApi';

type AuthState = {
  user: User | null
  token: string | null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    // 이와 같이 정의할 수 있지만 createApi를 통해서 정의한 endpoint를 사용하면 되므로 주석처리
    // setCredentials: (
    //   state,
    //   { payload: { user, token } }: PayloadAction<{ user: User; token: string }>
    // ) => {
    //   state.user = user
    //   state.token = token
    // },
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.user = null;
    }
  },
  // createApi로 정의한 api를 사용하기 위해 extraReducers를 사용한다.
  // authApi에서 동작한 login이 성공했다면 다음과 같이 동작한다.
  
  // QUESTION: 이 처리를 responsehandler에서 할 수 있는것 아닌가?
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        // token은 localStorage애 저장하고 사용자 정보는 전역 store로 관리한다.
        // QUESTION: 토큰이 만료되면 로그인 실패가 되나?
        localStorage.setItem('token',payload.token);
        state.token = payload.token
        state.user = payload.user
      }
    )
  },
})

// export const { setCredentials } = authSlice.actions
export const { logout } = authSlice.actions;
export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
