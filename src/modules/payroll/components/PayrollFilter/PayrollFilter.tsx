import React from 'react'
import { IFilter, IPayroll } from '../../../../models/payroll'
import { LIST_STATUS, STATUS_NAME } from '../../utils'
import './PayrollFilter.scss'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../../../../redux/reducer'
import { Action } from 'redux'
import { setAllPayrollsByFilter, setCurrentPage } from '../../redux/payrollReducer'
import _ from 'lodash'

interface Props {}

const PayrollField = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()
  const { allPayrolls } = useSelector((state: AppState) => ({
    allPayrolls: state.payroll.allPayrolls,
    allPayrollsByFilter: state.payroll.allPayrollsByFilter,
  }))

  const [filter, setFilter] = React.useState<IFilter>({ status: 'all', dateFrom: '', dateTo: '', invoice: '' })

  const handleClearFilter = () => {
    setFilter({ status: 'all', dateFrom: '', dateTo: '', invoice: '' })
  }

  React.useEffect(() => {
    if (_.isEmpty(filter)) {
      return
    }
    let allPayrollsByFilter = allPayrolls
    if (filter.status === 'all') {
      allPayrollsByFilter = allPayrolls
    }
    if (filter.status === STATUS_NAME.RECEIVED && allPayrolls) {
      allPayrollsByFilter = allPayrolls.filter((payroll) => payroll.received)
    }
    if (filter.status === STATUS_NAME.PROCESSING && allPayrolls) {
      allPayrollsByFilter = allPayrolls.filter((payroll) => payroll.matched || payroll.approved)
    }
    if (filter.status === STATUS_NAME.FULFILLED && allPayrolls) {
      allPayrollsByFilter = allPayrolls.filter((payroll) => payroll.fulfilled)
    }
    if (filter.status === STATUS_NAME.CANCELLED && allPayrolls) {
      allPayrollsByFilter = allPayrolls.filter((payroll) => payroll.canceled)
    }
    if (filter.status === STATUS_NAME.PENDING && allPayrolls) {
      allPayrollsByFilter = allPayrolls.filter(
        (payroll) =>
          !payroll.received && !payroll.matched && !payroll.approved && !payroll.fulfilled && !payroll.canceled,
      )
    }
    if (filter.dateFrom && allPayrollsByFilter) {
      const dateFrom = new Date(filter.dateFrom).getTime()
      allPayrollsByFilter = allPayrollsByFilter.filter((payroll) => {
        const payrollDate = new Date(payroll.time_created).getTime()
        return payrollDate >= dateFrom
      })
    }
    if (filter.dateTo && allPayrollsByFilter) {
      const dateTo = new Date(filter.dateTo).getTime()
      allPayrollsByFilter = allPayrollsByFilter.filter((payroll) => {
        const payrollDate = new Date(payroll.time_created).getTime()
        return payrollDate <= dateTo
      })
    }
    if (filter.dateFrom && filter.dateTo && allPayrollsByFilter) {
      const dateFrom = new Date(filter.dateFrom).getTime()
      const dateTo = new Date(filter.dateTo).getTime()
      if (dateFrom > dateTo) {
        alert('DateTO must be greater than DateFrom')
        return
      }
      allPayrollsByFilter = allPayrollsByFilter.filter((payroll) => {
        const payrollDate = new Date(payroll.time_created).getTime()
        return payrollDate >= dateFrom && payrollDate <= dateTo
      })
    }
    if (filter.invoice && allPayrollsByFilter) {
      allPayrollsByFilter = allPayrollsByFilter.filter((payroll) => payroll.payroll_id.includes(filter.invoice))
    }

    dispatch(setCurrentPage(1))

    if (allPayrollsByFilter) {
      dispatch(setAllPayrollsByFilter(allPayrollsByFilter))
    }
  }, [filter])

  return (
    <>
      <div className="payroll-field">
        <div className="list-field">
          {/* STATUS */}
          <div className="form-floating">
            <select
              value={filter.status}
              className="form-select"
              id="status"
              aria-label="Floating label select example"
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            >
              <option value="all">All</option>
              {LIST_STATUS &&
                LIST_STATUS.length > 0 &&
                LIST_STATUS.map((status, index) => (
                  <option value={status.value} key={index}>
                    {status.label}
                  </option>
                ))}
            </select>
            <label htmlFor="status">Status</label>
          </div>
          {/* DATE FROM */}
          <div className="form-floating">
            <input
              type="date"
              className="form-control"
              id="dateFrom"
              placeholder="From"
              value={filter.dateFrom}
              onChange={(e) => setFilter({ ...filter, dateFrom: e.target.value })}
            />
            <label htmlFor="dateFrom">From</label>
          </div>
          {/* DATE TO */}
          <div className="form-floating">
            <input
              type="date"
              className="form-control"
              id="dateTo"
              placeholder="To"
              value={filter.dateTo}
              onChange={(e) => setFilter({ ...filter, dateTo: e.target.value })}
            />
            <label htmlFor="dateTo">To</label>
          </div>
          {/* INVOICE */}
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="invoice"
              placeholder="Invoice #"
              value={filter.invoice}
              onChange={(e) => setFilter({ ...filter, invoice: e.target.value })}
            />
            <label htmlFor="invoice">Invoice #</label>
          </div>
        </div>
        {/* BUTTON */}
        <div className="list-action">
          <button className="btn btn-outline-primary apply">Apply</button>
          <button className="btn btn-outline-danger clear" onClick={() => handleClearFilter()}>
            Clear
          </button>
        </div>
      </div>
    </>
  )
}

export default PayrollField
