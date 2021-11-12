import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';

import counterReducer from '../features/counter/counterSlice';
import headerReducer from '../components/Header/headerSlice';
import  authReducer from '../features/auth/authSlice';
import { authApi } from '../features/auth/authApi';


const rootReducer = combineReducers({
  counter: counterReducer,
  header: headerReducer,
  auth:authReducer,
  [authApi.reducerPath]: authApi.reducer
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
      .concat(authApi.middleware),
    preloadedState
  })
};

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
