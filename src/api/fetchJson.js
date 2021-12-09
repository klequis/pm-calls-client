import * as R from 'ramda'
import { green } from '../logger'
export const endpoints = {
  info: {
    uri: '/api/info',
    method: 'POST',
    headers: {},
  },
  createLinkToken: {
    uri: '/api/create_link_token',
    method: 'POST',
    headers: {},
  },
  setAccessToken: {
    uri: '/api/set_access_token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    // body: `public_token=${public_token}`,
  },
  transactions: {
    uri: '/api/transactions',
    method: 'GET',
  },
  balance: {
    uri: 'api/balance',
    method: 'GET',
  },
}

/*
    body is temp maybe. it is only used for setAccessToken which adds a public
    token to the body.

    I need to see what public_token is
*/
export const fetchJson = async (uri, method, headers, body = {}) => {
  green('endpoint', uri)

  console.group('params')
  green('uri', uri)
  green('method', method)
  green('headers', headers)
  green('body', body)

  const _options = R.filter(x => R.not(R.isEmpty(x)), {
    method: method,
    headers: headers,
    body: body,
  })

  green('_options', _options)

  const res = await fetch(uri, _options)
  green('res', res)
  const json = await res.json()
  green('json', json)
  console.groupEnd()
  return { status: res.status, data: json, ok: res.ok }
}

/*
  it can have 
  - additional headers
  - a body


  merge headers
  merge body

  - create an options obj
  - merge into it

*/
