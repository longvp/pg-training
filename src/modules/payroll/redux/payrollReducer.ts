import _ from 'lodash'
import { ActionType, createCustomAction, getType } from 'typesafe-actions'
import { IPayroll } from '../../../models/payroll'

export interface PayrollState {
  allPayrolls?: IPayroll[] //PAYROLL BAN ĐẦU LẤY TỪ PAYROLL JSON
  allPayrollsByFilter?: IPayroll[] // PAYROLL CÒN LẠI SAU KHI REMOVE
  payrollsPerPage?: IPayroll[]
  currentPage?: number
  isSortASC?: boolean
  isOpenModal?: boolean
  payrollDetail?: IPayroll
  payrollUpdate?: IPayroll
}

const initialState = {
  allPayrolls: [],
  allPayrollsByFilter: [],
  payrollsPerPage: [],
  currentPage: 1,
  isSortASC: false,
  isOpenModal: false,
  payrollDetail: {
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
}

export const setAllPayrolls = createCustomAction('payroll/setAllPayrolls', (data: IPayroll[]) => ({
  data,
}))

export const setPayrollsPerPage = createCustomAction('payroll/setPayrollsPerPage', (data: IPayroll[]) => ({
  data,
}))

export const setCurrentPage = createCustomAction('payroll/setCurrentPage', (data: number) => ({
  data,
}))

export const setAllPayrollsByFilter = createCustomAction('payroll/setAllPayrollsByFilter', (data: IPayroll[]) => ({
  data,
}))

// REMOVE PAYROLL BY ID
// SET LẠI allPayrollsRemain
export const removePayrollById = createCustomAction('payroll/removePayrollById', (data: number | string) => ({
  data,
}))

export const sortPayrollByTotal = createCustomAction('payroll/sortByTotal')

export const setIsOpenModal = createCustomAction('payroll/setIsOpenModal', (data: boolean) => ({
  data,
}))

export const setPayrollDetail = createCustomAction('payroll/setPayrollDetail', (data: IPayroll) => ({
  data,
}))

export const updatePayroll = createCustomAction('payroll/updatePayroll', (data: IPayroll) => ({
  data,
}))

const actions = {
  setAllPayrolls,
  setPayrollsPerPage,
  setCurrentPage,
  setAllPayrollsByFilter,
  removePayrollById,
  sortPayrollByTotal,
  setIsOpenModal,
  setPayrollDetail,
  updatePayroll,
}

type Action = ActionType<typeof actions>

const removePayroll = (arrPayroll: IPayroll[], id: number | string) => {
  const index = arrPayroll.findIndex((payroll) => payroll.payroll_id === id)
  if (index !== -1) {
    arrPayroll.splice(index, 1)
  }
}

const sortASC = (arrPayroll: IPayroll[], sortByField: any) => {
  if (sortByField === 'volume_input_in_input_currency') {
    arrPayroll.sort((a, b) => {
      return a['volume_input_in_input_currency'] - b['volume_input_in_input_currency']
    })
  }
}

const sortDESC = (arrPayroll: IPayroll[], sortByField: any) => {
  if (sortByField === 'volume_input_in_input_currency') {
    arrPayroll.sort((a, b) => {
      return b['volume_input_in_input_currency'] - a['volume_input_in_input_currency']
    })
  }
}

const update = (arrPayroll: IPayroll[], data: IPayroll) => {
  const index = arrPayroll.findIndex((payroll) => payroll.payroll_id === data.payroll_id)
  if (index !== -1) {
    arrPayroll[index] = data
  }
}

export default function reducer(state: PayrollState = initialState, action: Action) {
  switch (action.type) {
    case getType(setAllPayrolls):
      return { ...state, allPayrolls: action.data, allPayrollsByFilter: action.data }
    case getType(setPayrollsPerPage):
      return { ...state, payrollsPerPage: action.data }
    case getType(setCurrentPage):
      return { ...state, currentPage: action.data }
    case getType(setAllPayrollsByFilter):
      return { ...state, allPayrollsByFilter: action.data }
    case getType(removePayrollById): {
      let allPayrollsByFilter: IPayroll[] = []
      if (state.allPayrollsByFilter) {
        allPayrollsByFilter = [...state.allPayrollsByFilter]
      }
      removePayroll(allPayrollsByFilter, action.data) // REMOVE TRONG allPayrollsByFilter
      let allPayrolls: IPayroll[] = []
      if (state.allPayrolls) {
        allPayrolls = [...state.allPayrolls]
      }
      removePayroll(allPayrolls, action.data) // REMOVE TRONG allPayrolls
      return { ...state, allPayrolls, allPayrollsByFilter }
    }
    case getType(sortPayrollByTotal): {
      let allPayrollsByFilter: IPayroll[] = []
      if (state.allPayrollsByFilter) {
        allPayrollsByFilter = [...state.allPayrollsByFilter]
      }
      let allPayrolls: IPayroll[] = []
      if (state.allPayrolls) {
        allPayrolls = [...state.allPayrolls]
      }
      if (state.isSortASC) {
        sortASC(allPayrollsByFilter, 'volume_input_in_input_currency')
        sortASC(allPayrolls, 'volume_input_in_input_currency')
      } else {
        sortDESC(allPayrollsByFilter, 'volume_input_in_input_currency')
        sortDESC(allPayrolls, 'volume_input_in_input_currency')
      }
      return { ...state, isSortASC: !state.isSortASC, allPayrolls, allPayrollsByFilter }
    }
    case getType(setIsOpenModal): {
      return { ...state, isOpenModal: action.data }
    }
    case getType(setPayrollDetail): {
      return { ...state, payrollDetail: action.data }
    }
    case getType(updatePayroll): {
      let allPayrollsByFilter: IPayroll[] = []
      if (state.allPayrollsByFilter) {
        allPayrollsByFilter = [...state.allPayrollsByFilter]
      }
      let allPayrolls: IPayroll[] = []
      if (state.allPayrolls) {
        allPayrolls = [...state.allPayrolls]
      }
      update(allPayrollsByFilter, action.data)
      update(allPayrolls, action.data)
      return { ...state, allPayrolls, allPayrollsByFilter }
    }
    default:
      return state
  }
}
