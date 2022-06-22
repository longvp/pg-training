import { faAngleDown, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { IPayroll } from '../../../../models/payroll'
import './PayrollItem.scss'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../../../../redux/reducer'
import { Action } from 'redux'
import { currencyFormat, statusFormat, STATUS_NAME } from '../../utils'
import moment from 'moment'
import { removePayrollById, setIsOpenModal, setPayrollDetail } from '../../redux/payrollReducer'

interface Props {
  payroll: IPayroll
}

const PayrollItem = (props: Props) => {
  const { payroll } = props
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()
  const { allPayrollsByFilter } = useSelector((state: AppState) => ({
    allPayrollsByFilter: state.payroll.allPayrollsByFilter,
  }))

  const [status, setStatus] = React.useState<string>('')

  // React.useEffect(() => {
  //   setStatus(STATUS_NAME.PENDING)
  //   if (payroll.received) {
  //     setStatus(STATUS_NAME.RECEIVED)
  //     return
  //   }
  //   if (payroll.matched || payroll.approved) {
  //     setStatus(STATUS_NAME.PROCESSING)
  //     return
  //   }
  //   if (payroll.fulfilled) {
  //     setStatus(STATUS_NAME.FULFILLED)
  //     return
  //   }
  //   if (payroll.canceled) {
  //     setStatus(STATUS_NAME.CANCELLED)
  //     return
  //   }
  // }, [])

  // DELETE PAYROLL BY ID

  const handleDelete = (payrollId: number | string) => {
    const checkConfirm = window.confirm('Do you want to delete ?')
    if (checkConfirm) {
      dispatch(removePayrollById(payrollId))
    }
  }

  // VIEW DETAIL
  const handleViewDetail = (payrollId: number | string) => {
    dispatch(setIsOpenModal(true))
    if (allPayrollsByFilter && allPayrollsByFilter.length > 0) {
      const payrollDetail = allPayrollsByFilter.find((payroll) => payroll.payroll_id === payrollId)
      if (payrollDetail) {
        dispatch(setPayrollDetail(payrollDetail))
      }
    }
  }

  return (
    <tr className="payroll-tr">
      <td className={`status ${statusFormat(payroll)}`}>{statusFormat(payroll)}</td>
      <td>{moment(payroll.time_created).format('ll')}</td>
      <td>{payroll.currency}</td>
      <td className="total">{currencyFormat(payroll.volume_input_in_input_currency)}</td>
      <td className="invoice">{payroll.payroll_id}</td>
      <td>
        <button type="button" className="button-detail" onClick={() => handleViewDetail(payroll.payroll_id)}>
          <span>Details</span>
          <FontAwesomeIcon icon={faAngleDown} />
        </button>
      </td>
      <td>
        <FontAwesomeIcon className="button-delete" icon={faTrashCan} onClick={() => handleDelete(payroll.payroll_id)} />
      </td>
    </tr>
  )
}

export default PayrollItem
