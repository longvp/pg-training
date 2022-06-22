import { IPayroll } from '../../models/payroll'

export const LIMIT_ITEMS: number = 10

export const LIST_STATUS = [
  { label: 'Received', value: 'received' },
  { label: 'Processing', value: 'processing' },
  { label: 'Fulfilled', value: 'fulfilled' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Pending', value: 'pending' },
]

export const STATUS_NAME = {
  RECEIVED: 'received',
  PROCESSING: 'processing',
  FULFILLED: 'fulfilled',
  CANCELLED: 'cancelled',
  PENDING: 'pending',
}

export const statusFormat = (payroll: IPayroll) => {
  if (payroll.received) {
    return STATUS_NAME.RECEIVED
  }
  if (payroll.approved || payroll.matched) {
    return STATUS_NAME.PROCESSING
  }
  if (payroll.fulfilled) {
    return STATUS_NAME.FULFILLED
  }
  if (payroll.canceled) {
    return STATUS_NAME.CANCELLED
  }
  return STATUS_NAME.PENDING
}

export const currencyFormat = (currency: number) => {
  return currency.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
