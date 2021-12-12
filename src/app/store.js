import { configureStore } from '@reduxjs/toolkit'
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
