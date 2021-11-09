import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit'

import counterReducer from '../features/counter/counterSlice';
import headerReducer from '../components/Header/headerSlice';

import { combineReducers } from 'redux';

import { registeApi } from '../features/register/registeApi';

const rootReducer = combineReducers({
  counter: counterReducer,
  header: headerReducer,
  [registeApi.reducerPath]: registeApi.reducer
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
      .concat(registeApi.middleware),
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
