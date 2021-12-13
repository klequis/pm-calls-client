import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
// import { useUser } from '../components/useUser'
import { createUser } from './userSlice'

export const AddUserForm = () => {
  // const { createUser } = useUser()
  const [username, setUsername] = useState('')

  const _dispatch = useAppDispatch()

  const onUsernameChange = (e: any) => {
    setUsername(e.target.value)
  }

  // const onAddUserClick = () => {
  //   _dispatch(createUser(username))
  // }

  return (
    <>
      <input type="text" name="username" onChange={onUsernameChange} />
      <button onClick={() => _dispatch(createUser(username))}>Add user</button>
    </>
  )
}
