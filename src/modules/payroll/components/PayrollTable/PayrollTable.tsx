import { faArrowsUpDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../../../../redux/reducer'
import { Action } from 'redux'
import PayrollItem from './PayrollItem'
import './PayrollTable.scss'
import { setCurrentPage, sortPayrollByTotal } from '../../redux/payrollReducer'

interface Props {}

const PayrollTable = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()

  const { payrollsPerPage } = useSelector((state: AppState) => ({
    payrollsPerPage: state.payroll.payrollsPerPage,
  }))

  const handleSortByTotal = () => {
    dispatch(sortPayrollByTotal())
  }

  return (
    <table className="payroll-table">
      <thead className="payroll-thead">
        <tr className="payroll-thead-tr">
          <th>Status</th>
          <th>Date</th>
          <th>Currency</th>
          <th onClick={() => handleSortByTotal()}>
            Total
            <FontAwesomeIcon icon={faArrowsUpDown} className="icon" />
          </th>
          <th>Invoice #</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody className="payroll-tbody">
        {payrollsPerPage &&
          payrollsPerPage.length > 0 &&
          payrollsPerPage.map((payroll) => <PayrollItem key={payroll.payroll_id} payroll={payroll} />)}
      </tbody>
    </table>
  )
}

export default PayrollTable
