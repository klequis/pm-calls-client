export const useLink = () => {
  const generateLinkToken = useCallback(async (userId, itemId) => {
    // if itemId is not null, update mode is triggered
    const linkTokenResponse = await getLinkToken(userId, itemId)
    if (linkTokenResponse.data.link_token) {
      const token = await linkTokenResponse.data.link_token
      console.log('success', linkTokenResponse.data)

      if (itemId != null) {
        dispatch({
          type: 'LINK_TOKEN_UPDATE_MODE_CREATED',
          id: itemId,
          token: token,
        })
      } else {
        dispatch({ type: 'LINK_TOKEN_CREATED', id: userId, token: token })
      }
    } else {
      dispatch({ type: 'LINK_TOKEN_ERROR', error: linkTokenResponse.data })
      console.log('error', linkTokenResponse.data)
    }
  }, [])

  return {}
}
