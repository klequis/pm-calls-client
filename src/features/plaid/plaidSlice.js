import { createSlice } from '@reduxjs/toolkit'
import * as R from 'ramda'

const wdLinkSuccess = 'linkSuccess'
const wdIsItemAccess = 'isItemAccess'
const wdLinkToken = 'linkToken'
const wdAccessToken = 'accessToken'
const wdItemId = 'itemId'
const wdIsError = 'isError'
const wdBackend = 'backend'
const wdProducts = 'products'
const wdLinkTokenError = 'linkTokenError'
const wdErrorType = 'error_type'
const wdErrorCode = 'error_code'
const wdErrorMessage = 'error_message'

const initialState = {
  [wdLinkSuccess]: false,
  [wdIsItemAccess]: true,
  [wdLinkToken]: '', // Don't set to null or error message will show up briefly when site loads
  [wdAccessToken]: null,
  [wdItemId]: null,
  [wdIsError]: false,
  [wdBackend]: true,
  [wdProducts]: ['transactions'],
  [wdLinkTokenError]: {
    [wdErrorType]: '',
    [wdErrorCode]: '',
    [wdErrorMessage]: '',
  },
}

export const plaidSlice = createSlice({
  name: 'plaid',
  initialState,
  reducers: {
    accessToken: (state, action) => {
      return R.mergeRight(state, { [wdAccessToken]: action.payload })
    },
    backend: (state, action) => {
      return R.mergeRight(state, { [wdBackend]: action.payload })
    },
    isError: (state, action) => {
      return R.mergeRight(state, { [wdIsError]: action.payload })
    },
    isItemAccess: (state, action) => {
      return R.mergeRight(state, { [wdIsItemAccess]: action.payload })
    },
    itemId: (state, action) => {
      return R.mergeRight(state, { [wdItemId]: action.payload })
    },
    linkSuccess: (state, action) => {
      // console.log("linkeSuccess: action", action);
      return R.mergeRight(state, { [wdLinkSuccess]: action.payload })
    },
    linkToken: (state, action) => {
      return R.mergeRight(state, { [wdLinkToken]: action.payload })
    },
    linkTokenError: (state, action) => {
      return R.mergeRight(state, { [wdLinkTokenError]: action.payload })
    },
    products: (state, action) => {
      return R.mergeRight(state, { [wdProducts]: action.payload })
    },
  },
})

export const selectPlaidState = state => state.plaid
const plaidSliceReducer = plaidSlice.reducer
export default plaidSliceReducer

export const {
  linkSuccess,
  isItemAccess,
  linkToken,
  accessToken,
  itemId,
  isError,
  backend,
  products,
  linkTokenError,
} = plaidSlice.actions
