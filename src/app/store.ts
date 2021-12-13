import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import plaidReducer from '../features/plaid/plaidSlice'
import txReducer from '../features/tx/txSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    plaid: plaidReducer,
    tx: txReducer,
    user: userReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
