export interface IPayroll {
  approved: boolean
  async_status: string
  canceled: boolean
  company_id: string
  confirmed: boolean
  currency: string
  date_canceled: string | null
  date_confirmed: string | null
  date_fulfilled: string | null
  date_matched: string | null
  date_processed: string | null
  date_received: string | null
  date_released: string | null
  deposit_address?: string | null
  fees: number
  fulfilled: boolean

  funding_buy_rate?: number | string
  funding_currency?: string
  funding_flat_fee_in_input_currency?: number
  funding_percentage_fee?: number
  funding_sell_rate?: number | string

  is_premium: boolean
  matched: boolean
  number_of_recipients: number
  payment_type: string
  payroll_id: string
  received: boolean
  released: boolean
  subpayroll_ids: string[]
  time_created: string
  volume_input_in_input_currency: number
}

export interface IFilter {
  status: string
  dateFrom: string
  dateTo: string
  invoice: string
}

// export interface IPaging {
//   //start: (currentPage - 1) * limit
//   // end: currentPage * limit
//   currentPage: number
// }
