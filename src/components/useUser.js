// import { useCallback, useRef } from 'react'
// import { api } from '../api'
import { useDispatch } from 'react-redux'
import { createUser as sliceCreateUser } from '../features/user/userSlice'
// import { fetchJson } from '../api/fetchJson'

// const apiReadUsers = () => api.get('/users')

// export const apiCreateUser = (username: string) =>
//   api.post('/users', { username })

export const useUser = () => {
  // const _dispatach = useDispatch()

  // const createUser = useCallback(async username => {
  //   const a = await sliceCreateUser(username)
  //   console.log('a', a)
  // }, [])
  const createUser = async username => {
    const a = await sliceCreateUser(username)
    console.log('a', a)
  }

  return {
    createUser,
    // readUsers,
  }
}
