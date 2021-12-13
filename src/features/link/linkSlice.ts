import {
  createAsyncThunk,
  createSlice,
  // PayloadAction,
  current,
} from '@reduxjs/toolkit'
import { api } from '../../api'

import {
  wdRequestStatusError,
  wdRequestStatusFetch,
  wdRequestStatusFulfilled,
  wdRequestStatusPending,
  wdUser,
} from '../../appWords'
import * as R from 'ramda'

export interface linkState {
  linkToken: string | null
  fetchStatus: string
  fetchError: any | null
}

const initialState: linkState = {
  linkToken: null,
  fetchStatus: wdRequestStatusFetch,
  fetchError: null,
}

export const linkToken = createAsyncThunk('link/createLinkToken', async () => {
  // call api
  const r = await api.post('/link-token')
  const { data } = r
  const m = data[0]
  console.log('linkToken: m', m)
  // return link token data
})

export const linkSlice = createSlice({
  name: 'link',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(linkToken.pending, state => {
        const s = current(state)
        return R.mergeRight(s, { linkToken: null })
      })
      .addCase(linkToken.fulfilled, (state, action) => {
        const s = current(state)
        const { payload } = action
        const a = R.mergeRight(s, { payload })
        console.log('linkToken.fulfilled: a', a)
        return a
      })
      .addCase(linkToken.rejected, (state, action) => {
        const s = current(state)
        const { payload } = action
        const m = R.mergeRight(s, {
          fetchStatus: wdRequestStatusError,
          fetchError: payload,
        })
        return m
      })
  },
})

export default linkSlice.reducer
