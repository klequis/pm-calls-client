import { selectUser } from 'src/selectors'
import { useAppSelector } from 'src/app'
// import { useLink } from '../tokens/useLink'

export const User = () => {
  // const { generateLinkToken, linkTokens } = useLink()
  const { username } = useAppSelector(selectUser)
  return (
    <>
      User: {username}
      <button>Add a bank</button>
    </>
  )
}
