import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { api } from '../../api'
import { wdRequestStatusFetch, wdUser } from '../../appWords'
import * as R from 'ramda'

const initialState = {
  id: null,
  username: null,
  fetch: {
    status: wdRequestStatusFetch,
    error: null,
  },
}

/**
 * @param {string} username
 */
export const createUser = createAsyncThunk(
  'user/createUser',
  async (username, thunkApi) => {
    const r = await api.post('/users', { username })
    const { data } = r
    console.log('data', data)
    return data
  }
)

export const readUser = createAsyncThunk(
  'user/readUser',
  async (id, thunkAPI) => {
    const state = thunkAPI.getState()
    if (state.id === null) {
      const r = await api.get('/users')
      return r
    }
    return { id: state.id, username: state.username }
  }
)

const userSlice = createSlice({
  name: wdUser,
  initialState,
  reducers: {},
  extraReducers: {
    // createUser
    [createUser.pending]: state => {
      const s = current(state)
      return R.mergeRight(s, { id: null, username: null, error: null })
    },
    [createUser.fulfilled]: (state, action) => {
      const s = current(state)
      const { payload } = action
      console.log('payload', payload)
      const { _id: id, username } = payload[0]
      return R.mergeRight(s, { id, username })
    },
    [createUser.rejected]: (state, action) => {
      const s = current(state)
      const { payload } = action
      return R.mergeRight(s, { error: payload })
    },
    // readUser
    [readUser.pending]: state => {
      const s = current(state)
      return R.mergeRight(s, { id: null, username: null, error: null })
    },
    [readUser.fulfilled]: (state, action) => {
      const s = current(state)
      const { payload } = action
      return R.mergeRight(s, payload)
    },
    [readUser.rejected]: (state, action) => {
      const s = current(state)
      const { payload } = action
      return R.mergeRight(s, { error: payload })
    },
  },
})

export default userSlice.reducer
