import { useState } from 'react'
import { useDispatch } from 'react-redux'
// import { useUser } from '../components/useUser'
import { createUser } from '../features/user'

export const AddUserForm = () => {
  // const { createUser } = useUser()
  const [username, setUsername] = useState('')

  const _dispatch = useDispatch()

  const onUsernameChange = (e: any) => {
    setUsername(e.target.value)
  }

  const onAddUserClick = () => {
    // @ts-ignore
    _dispatch(createUser(username))
  }

  return (
    <>
      <input type="text" name="username" onChange={onUsernameChange} />
      <button onClick={onAddUserClick}>Add user</button>
    </>
  )
}
