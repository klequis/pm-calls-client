import { selectUser } from '../../selectors/userSelector'
import { useAppSelector } from '../../app/hooks'

export const LandingHeader = () => {
  const { username } = useAppSelector(selectUser)
  return <p>Hello {username}</p>
}
