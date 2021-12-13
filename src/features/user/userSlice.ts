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
// ** will need RootState in selectors
// import { RootState, AppThunk } from '../../app/store'

export interface userState {
  id: string | null
  username: string | null
  fetchStatus: string
  fetchError: any | null
}

const initialState: userState = {
  id: null,
  username: null,
  fetchStatus: wdRequestStatusFetch,
  fetchError: null,
}

/**
 * @param {string} username
 * @return {object} { _id: string, username: string }
 */
export const createUser = createAsyncThunk(
  'user/createUser',
  async (username: string) => {
    const r = await api.post('/users', { username })
    const { data } = r
    return data[0]
  }
)

// export const readUser = createAsyncThunk(
//   'user/readUser',
//   async (id, thunkAPI) => {
//     const state = thunkAPI.getState()
//     if (state.id === null) {
//       const r = await api.get('/users')
//       return r
//     }
//     return { id: state.id, username: state.username }
//   }
// )

export const userSlice = createSlice({
  name: wdUser,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createUser.pending, state => {
        const s = current(state)
        return R.mergeRight(s, {
          id: null,
          username: null,
          fetchStatus: wdRequestStatusPending,
          error: null,
        })
      })
      .addCase(createUser.fulfilled, (state, action) => {
        const s = current(state)
        const { payload } = action
        const { _id: id, username } = payload
        const m = R.mergeRight(s, {
          id: id,
          username: username,
          fetchStatus: wdRequestStatusFulfilled,
        })
        console.log('fullfilled m', m)
        return m
      })
      .addCase(createUser.rejected, (state, action) => {
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

export default userSlice.reducer

/*
zzextraReducers: {
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
    // // readUser
    // [readUser.pending]: state => {
    //   const s = current(state)
    //   return R.mergeRight(s, { id: null, username: null, error: null })
    // },
    // [readUser.fulfilled]: (state, action) => {
    //   const s = current(state)
    //   const { payload } = action
    //   return R.mergeRight(s, payload)
    // },
    // [readUser.rejected]: (state, action) => {
    //   const s = current(state)
    //   const { payload } = action
    //   return R.mergeRight(s, { error: payload })
    // },
  },

*/
