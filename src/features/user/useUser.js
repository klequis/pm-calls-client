import { createUser as sliceCreateUser } from '../features/user/userSlice'

export const useUser = () => {
  const createUser = async username => {
    const a = await sliceCreateUser(username)
    console.log('a', a)
  }

  return {
    createUser,
    // readUsers,
  }
}
