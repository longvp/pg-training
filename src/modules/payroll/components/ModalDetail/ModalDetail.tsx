import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../../../../redux/reducer'
import { Action } from 'redux'
import './ModalDetail.scss'
import { setIsOpenModal, updatePayroll } from '../../redux/payrollReducer'
import moment from 'moment'
import { currencyFormat, LIST_STATUS } from '../../utils'
import { IPayroll } from './../../../../models/payroll'

interface Props {}

const ModalDetail = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()

  const { isOpenModal, payrollDetail } = useSelector((state: AppState) => ({
    isOpenModal: state.payroll.isOpenModal,
    payrollDetail: state.payroll.payrollDetail,
  }))

  const [payrollUpdate, setPayrollUpdate] = React.useState<IPayroll>(
    payrollDetail || {
      approved: false,
      async_status: '',
      canceled: false,
      company_id: '',
      confirmed: false,
      currency: '',
      date_canceled: '',
      date_confirmed: '',
      date_fulfilled: '',
      date_matched: '',
      date_processed: '',
      date_received: '',
      date_released: '',
      deposit_address: '',
      fees: 0,
      fulfilled: false,

      funding_buy_rate: 0,
      funding_currency: '',
      funding_flat_fee_in_input_currency: 0,
      funding_percentage_fee: 0,
      funding_sell_rate: 0,

      is_premium: false,
      matched: false,
      number_of_recipients: 0,
      payment_type: '',
      payroll_id: '',
      received: false,
      released: false,
      subpayroll_ids: [],
      time_created: '',
      volume_input_in_input_currency: 0,
    },
  )
  const [isShowBtnUpdate, setIsShowBtnUpdate] = React.useState<boolean>(false)

  const handleHideModal = () => {
    dispatch(setIsOpenModal(false))
  }

  React.useEffect(() => {
    if (JSON.stringify(payrollUpdate) !== JSON.stringify(payrollDetail)) {
      setIsShowBtnUpdate(true)
    } else {
      setIsShowBtnUpdate(false)
    }
  }, [payrollUpdate])

  const handleSaveChange = () => {
    const checkConfirm = window.confirm('Do you want to save change ?')
    if (checkConfirm) {
      dispatch(setIsOpenModal(false))
      dispatch(updatePayroll(payrollUpdate))
    }
  }

  return (
    <>
      <div className={`modal ${isOpenModal ? 'show' : ''}`} tabIndex={-1}>
        <div className="modal-dialog">
          {payrollDetail && payrollDetail.payroll_id && (
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Payroll Detail</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => handleHideModal()}
                ></button>
              </div>
              <div className="modal-body">
                {/* <div className="form-floating">
                  <select
                    defaultValue="4567"
                    className="form-select"
                    id="status"
                    aria-label="Floating label select example"
                  >
                    {LIST_STATUS &&
                      LIST_STATUS.length > 0 &&
                      LIST_STATUS.map((status, index) => (
                        <option value={status.value} key={index}>
                          {status.label}
                        </option>
                      ))}
                  </select>
                  <label htmlFor="status">Status</label>
                </div> */}
                {/* DATE */}
                <div className="form-floating">
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    placeholder="Date"
                    name="time_created"
                    value={new Date(payrollUpdate.time_created).toLocaleDateString('en-CA')}
                    onChange={(e) => setPayrollUpdate({ ...payrollUpdate, time_created: e.target.value })}
                  />
                  <label htmlFor="date">Date</label>
                </div>
                {/* CURRENCY */}
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="currencyDetail"
                    placeholder="Invoice #"
                    value={payrollUpdate.currency}
                    onChange={(e) => setPayrollUpdate({ ...payrollUpdate, currency: e.target.value })}
                  />
                  <label htmlFor="currencyDetail">Currency</label>
                </div>
                {/* TOTAL */}
                <div className="form-floating">
                  <input
                    type="number"
                    className="form-control"
                    id="totalDetail"
                    placeholder="Invoice #"
                    value={payrollUpdate.volume_input_in_input_currency}
                    onChange={(e) =>
                      setPayrollUpdate({ ...payrollUpdate, volume_input_in_input_currency: +e.target.value })
                    }
                  />
                  <label htmlFor="totalDetail">Total</label>
                </div>
                {/* INVOICE */}
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="invoiceDetail"
                    placeholder="Invoice #"
                    disabled={true}
                    value={payrollUpdate.payroll_id}
                  />
                  <label htmlFor="invoiceDetail">Invoice #</label>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => handleHideModal()}
                >
                  Close
                </button>
                <button
                  type="button"
                  disabled={!isShowBtnUpdate}
                  className="btn btn-primary"
                  onClick={() => handleSaveChange()}
                >
                  Save changes
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="modal-overlay" onClick={() => handleHideModal()}></div>
      </div>
    </>
  )
}

export default ModalDetail
