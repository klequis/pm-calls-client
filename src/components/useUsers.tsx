import { useCallback, useRef } from 'react'
import { api } from '../api'
import { fetchJson } from '../api/fetchJson'

const apiReadUsers = () => api.get('/users')

export const apiCreateUser = (username: string) =>
  api.post('/users', { username })

// export const apiCreateUser = (username: string) =>
//   fetchJson('/users', 'post', {}, { username })

export const useUsers = () => {
  const hasRequested = useRef<{
    all: Boolean
    byId: { [id: number]: boolean }
  }>({
    all: false,
    byId: {},
  })

  /**
   * @desc Requests all Users.
   * The api request will be bypassed if the data has already been fetched.
   * A 'refresh' parameter can force a request for new data even if local state exists.
   */
  const readUsers = useCallback(async refresh => {
    if (!hasRequested.current.all || refresh) {
      hasRequested.current.all = true
      // for now
      const { data } = await apiReadUsers()
      console.log('readUsers: data', data)
      // when doing redux
      // const { data: payload } = await apiGetUsers();
      // dispatch({ type: "SUCCESSFUL_GET", payload: payload });
    }
  }, [])

  const createUser = useCallback(async username => {
    const { data } = await apiCreateUser(username)
    console.log('createUser: data', data)
  }, [])

  return {
    createUser,
    readUsers,
  }
}

/*
    c: createUser
    r: readUser
    u: updateUser
    d: deleteUser

*/
