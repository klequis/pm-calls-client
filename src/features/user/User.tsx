import { selectUser } from '../selectors/userSelector'
import { useAppSelector } from '../app/hooks'
import { /*useItems, useUsers,*/ useLink } from '../services'

export const User = () => {
  const { generateLinkToken, linkTokens } = useLink()
  const { username } = useAppSelector(selectUser)
  return (
    <>
      User: {username}
      <button>Add a bank</button>
    </>
  )
}
