import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './PayrollHeader.scss'
import { useSelector } from 'react-redux'
import { AppState } from '../../../../redux/reducer'
import { CSVLink } from 'react-csv'
import { IPayroll } from './../../../../models/payroll'

interface Props {}

const PayrollHeader = (props: Props) => {
  const { allPayrollsByFilter } = useSelector((state: AppState) => ({
    allPayrollsByFilter: state.payroll.allPayrollsByFilter,
  }))

  const [dataPayroll, setDataPayroll] = React.useState<IPayroll[]>([])

  React.useEffect(() => {
    if (allPayrollsByFilter && allPayrollsByFilter.length > 0) {
      setDataPayroll(allPayrollsByFilter)
    }
  }, [allPayrollsByFilter])

  // const headers = [
  //   { label: 'Status', key: 'status' },
  //   { label: 'Date', key: 'date' },
  //   { label: 'Currency', key: 'currency' },
  //   { label: 'Total', key: 'total' },
  //   { label: 'Invoice', key: 'invoice' },
  // ]

  const csvExport = {
    filename: 'Payrolls.csv',
    //headers: headers,
    data: dataPayroll,
  }

  return (
    <>
      <div className="payroll-header">
        <h4 className="payroll-title-heading">Payroll Transactions List</h4>
        <CSVLink {...csvExport}>
          <button className="btn btn-success export">
            <span>Export CSV</span>
            <FontAwesomeIcon icon={faAngleDown} />
          </button>
        </CSVLink>
      </div>
    </>
  )
}

export default PayrollHeader
