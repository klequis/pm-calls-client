import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as R from 'ramda'
import { endpoints, fetchJson } from '../../api/fetchJson'
import { wdRequestStatusFetch } from '../../appWords'
import { blue, grpStart, grpEnd } from '../../logger'

const initialState = {
  items: [],
  fetch: {
    status: wdRequestStatusFetch,
    error: null,
  },
}

export const txFetch = createAsyncThunk(
  'transactions/get',
  async (noValuePassed, thunkApi) => {
    // const { getState } = thunkApi;
    // const state = getState();
    // const r = await fetch("/api/transactions", { method: "get" });
    const r = await fetchJson(endpoints.transactions)
    grpStart('txFetch')
    console.log('[txSlice.txFetch: r]: ', r)
    // const data = await r.json();
    const { data } = r
    console.log('[txSlice.txFetch: data]: ', data)
    grpEnd()
    return data
  }
)

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    data: (state, action) => {
      R.mergeRight(state, { data: action.payload.data })
    },
  },
  extraReducers: {
    [txFetch.pending]: state => {
      console.group('txFetch.pending')
      blue('state', current(state))
      console.groupEnd()
      return R.pipe(
        _fetchStatusSet(wdRequestStatusPending),
        _itemsSet([])
      )(current(state))
    },
    [txFetch.fulfilled]: (state, action) => {
      console.group('txFetch.fulfilled')
      blue('state', current(state))
      blue('action', action)
      console.groupEnd()
      const items = R.path([wdPayload, wdTransactions], action)
      return R.pipe(
        _fetchStatusSet(wdRequestStatusFulfilled),
        _itemsSet(items)
      )(current(state))
    },
    [txFetch.rejected]: (state, action) => {
      console.group('txFetch.rejected')
      blue('state', current(state))
      blue('action', action)
      console.groupEnd()
      const error = R.path([wdError, wdMessage], action)
      return R.pipe(
        selectTxFetchStatus(wdRequestStatusError),
        _itemsSet([]),
        _fetchErrorSet(error)
      )(current(state))
    },
  },
})

export const {} = accountsSlice.actions

export const selectAccounts = state => state.accounts
export default accountsSlice.reducer
