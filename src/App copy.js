import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  backend,
  products,
  linkToken,
  linkTokenError,
  selectPlaidState,
} from './features/plaid/plaidSlice'
import { Headers } from './components/Headers'
import { TxTbl } from './features/tx/txTbl'
import { endpoints, fetchJson } from './api/fetchJson'

const App = () => {
  const _dispatch = useDispatch()

  const getInfo = useCallback(async () => {
    const response = await fetchJson(endpoints.info)
    if (!response.ok) {
      _dispatch(backend(false))
      return { paymentInitiation: false }
    }
    const { data } = response
    const paymentInitiation = data.products.includes('payment_initiation')
    _dispatch(products(data.products))
    return { paymentInitiation }
  }, [_dispatch])

  const generateToken = useCallback(
    async paymentInitiation => {
      const response = await fetchJson(endpoints.createLinkToken)
      if (!response.ok) {
        _dispatch(linkToken(null))
        return
      }
      const { data } = response

      if (data) {
        if (data.error != null) {
          _dispatch(linkTokenError(data.error))
          return
        }
        _dispatch(linkToken(data.link_token))
      }
      localStorage.setItem('link_token', data.link_token) //to use later for Oauth
    },
    [_dispatch]
  )

  useEffect(() => {
    const init = async () => {
      const { paymentInitiation } = await getInfo() // used to determine which path to take when generating token
      if (window.location.href.includes('?oauth_state_id=')) {
        _dispatch(linkToken(localStorage.getItem('link_token')))
        return
      }
      generateToken(paymentInitiation)
    }
    init()
  }, [_dispatch, generateToken, getInfo])

  const plaidState = useSelector(state => selectPlaidState(state))

  return (
    <div>
      <div>
        <Headers />
        {plaidState.linkSuccess && plaidState.isItemAccess && (
          <>
            <TxTbl />
          </>
        )}
      </div>
    </div>
  )
}

export default App
