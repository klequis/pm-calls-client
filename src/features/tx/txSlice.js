import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import * as R from 'ramda'
import { createNewState } from '../helpers'
import {
  pathTxFetchError,
  wdRequestStatusFetch,
  wdRequestStatusFulfilled,
  wdRequestStatusError,
  wdRequestStatusPending,
  wdTx,
  wdPayload,
  wdData,
  wdMessage,
  wdError,
  // pathTxActiveId,
  pathTxItems,
  pathTxFetchStatus,
  wdTransactions,
} from '../../appWords'
import { selectTxFetchStatus } from '../../selectors/txSelectors'
import { endpoints, fetchJson } from '../../api/fetchJson'
import { blue, grpStart, grpEnd } from '../../logger'

const initialState = {
  activeId: '',
  items: [],
  fetch: {
    status: wdRequestStatusFetch,
    error: null,
  },
}
/*

<Endpoint
  endpoint="transactions"
  name="Transactions"
  categories={transactionsCategories}
  schema="/transactions/get/"
  description="Retrieve transactions for credit and depository accounts."
  transformData={transformTransactionsData}
/>
*/

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

const _itemsSet = R.curry((items, state) => {
  return createNewState(pathTxItems, items, state)
})

const _fetchStatusSet = R.curry((status, state) => {
  return createNewState(pathTxFetchStatus, status, state)
})

const _fetchErrorSet = R.curry((errorMessage, state) => {
  return createNewState(pathTxFetchError, errorMessage, state)
})

// const _activeIdSet = R.curry((id, state) => {
//   return createNewState(pathTxActiveId, id, state);
// });

export const txSlice = createSlice({
  name: wdTx,
  initialState,
  reducers: {
    // txActiveIdSet(state, action) {
    //   const currState = current(state);
    //   const id = action.payload;
    //   return _activeIdSet(id, currState); // (currState)
    // },
    // txActiveIdClear(state) {
    //   const currState = current(state);
    //   return _activeIdSet(null, currState);
    // },
    txFetchStatusSetRefresh(state) {
      const currState = current(state)
      return _fetchStatusSet(wdRequestStatusFetch, currState)
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

export default txSlice.reducer
export const { /* txActiveIdClear, txActiveIdSet,*/ txFetchStatusSetRefresh } =
  txSlice.actions
