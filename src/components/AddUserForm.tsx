import { useState } from 'react'
import { useUsers } from '../components/useUsers'

export const AddUserForm = () => {
  const { createUser } = useUsers()
  const [username, setUsername] = useState('')
  const onUsernameChange = (e: any) => {
    setUsername(e.target.value)
  }
  const onAddUserClick = (e: any) => {
    createUser(username)
  }
  return (
    <>
      <input type="text" name="username" onChange={onUsernameChange} />
      <button onClick={onAddUserClick}>Add user</button>
    </>
  )
}
