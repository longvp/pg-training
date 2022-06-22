import React from 'react'
import './PayrollPage.scss'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from './../../../redux/reducer'
import { Action } from 'redux'
import PayrollJson from '../payrolls.json'
import PayrollFilter from '../components/PayrollFilter/PayrollFilter'
import PayrollFooter from '../components/PayrollPaging/PayrollPaging'
import PayrollHeader from '../components/PayrollHeader/PayrollHeader'
import PayrollTable from '../components/PayrollTable/PayrollTable'
import { LIMIT_ITEMS } from './../utils'
import { setAllPayrolls, setPayrollsPerPage } from '../redux/payrollReducer'
import ModalDetail from '../components/ModalDetail/ModalDetail'

interface Props {}

const PayrollPage = (props: Props) => {
  const payrollsJSON = PayrollJson.payrolls

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()

  const { allPayrollsByFilter, currentPage, isOpenModal } = useSelector((state: AppState) => ({
    allPayrollsByFilter: state.payroll.allPayrollsByFilter,
    currentPage: state.payroll.currentPage,
    isOpenModal: state.payroll.isOpenModal,
  }))

  const getPayrollsPerPage = React.useCallback(
    (allPayrollsByFilter, currentPage) => {
      const start = (currentPage - 1) * LIMIT_ITEMS
      const end = currentPage * LIMIT_ITEMS
      const payrollsPerPage = allPayrollsByFilter.slice(start, end)
      dispatch(setPayrollsPerPage(payrollsPerPage))
    },
    [allPayrollsByFilter, currentPage],
  )

  React.useEffect(() => {
    if (payrollsJSON && payrollsJSON.length > 0) {
      dispatch(setAllPayrolls(payrollsJSON))
    }
  }, [payrollsJSON])

  React.useEffect(() => {
    if (!currentPage || !allPayrollsByFilter) {
      return
    }
    getPayrollsPerPage(allPayrollsByFilter, currentPage)
  }, [allPayrollsByFilter, currentPage])

  return (
    <>
      <div className="payroll-page">
        <PayrollHeader />
        <PayrollFilter />
        {allPayrollsByFilter && allPayrollsByFilter.length > 0 ? (
          <>
            <PayrollTable />
            <PayrollFooter />
            {isOpenModal && <ModalDetail />}
          </>
        ) : (
          <h4>Not Found</h4>
        )}
      </div>
    </>
  )
}

export default PayrollPage
