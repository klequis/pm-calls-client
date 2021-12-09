import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { txFetch } from './txSlice'
import {
  // selectActiveTxId,
  selectTxFetchStatus,
  selectRequestStatus,
} from '../../selectors'
import { wdRequestStatusFetch, wdTxFetchStatus } from '../../appWords'
import { RenderWhenReady } from '../../components/RenderWhenReady'
import { green } from '../../logger'

export const TxTbl = () => {
  const _dispatch = useDispatch()
  const _status = useSelector(state =>
    selectRequestStatus([wdTxFetchStatus], state)
  )
  // green("_status", _status);
  const _transactionsFetchStatus = useSelector(selectTxFetchStatus)
  // green("_transactionsFetchStatus", _transactionsFetchStatus);
  useEffect(() => {
    if (_transactionsFetchStatus === wdRequestStatusFetch) {
      _dispatch(txFetch())
    }
  }, [_dispatch, _transactionsFetchStatus])

  return (
    <RenderWhenReady status={_status} className="container-fluid">
      <>
        <p>Do I have the transactions?</p>
      </>
    </RenderWhenReady>
  )
}
