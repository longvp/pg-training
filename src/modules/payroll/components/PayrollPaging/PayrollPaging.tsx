import React from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../../../../redux/reducer'
import { Action } from 'redux'
import './PayrollPaging.scss'
import { LIMIT_ITEMS } from '../../utils'
import { setCurrentPage } from '../../redux/payrollReducer'

interface Props {}

const PayrollFooter = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()
  const [initialPage, setInitialPage] = React.useState<number>(0)

  const { allPayrollsByFilter, currentPage } = useSelector((state: AppState) => ({
    allPayrollsByFilter: state.payroll.allPayrollsByFilter,
    currentPage: state.payroll.currentPage,
  }))

  const handleOnChangePage = (data: any) => {
    dispatch(setCurrentPage(data?.selected + 1))
  }

  React.useEffect(() => {
    if (currentPage) {
      setInitialPage(currentPage - 1)
    }
  }, [])

  return (
    <>
      <div className="payroll-footer">
        <div className="text-show-item">
          Showing
          <span className="number-highlight">10</span>
          from
          <span className="number-highlight">{allPayrollsByFilter && allPayrollsByFilter.length}</span>
          data
        </div>
        <div className="pagination">
          {allPayrollsByFilter && allPayrollsByFilter.length > 0 ? (
            <ReactPaginate
              previousLabel={'<<'}
              nextLabel={'>>'}
              pageCount={Math.ceil(+allPayrollsByFilter.length / LIMIT_ITEMS)}
              onPageChange={handleOnChangePage}
              containerClassName={'pagintation'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
              initialPage={initialPage}
              activeClassName={'active'}
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  )
}

export default PayrollFooter
