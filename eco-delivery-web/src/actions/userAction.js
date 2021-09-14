import * as types from '../contants/ActionTypes'

export const onTokenReturn = (token, firstname, id) => ({
  type: types.TOKEN_RETURN,
  token,
  firstname,
  id
})

export const onAccountSummaryReturn = (firstname, credits, ecoOrders) => ({
  type: types.ACCOUNT_SUMMARY_RETURN,
  firstname,
  credits,
  ecoOrders
})

export const onShowData = () => ({
  type: types.SHOW_DATA
})

export const onOrderHistoryReturn = (placed, picked, completed, canceled) => ({
  type: types.ORDER_HISTORY_RETURN,
  placed, 
  picked,
  completed,
  canceled
})

export const onLogOut = () => ({
  type: types.LOGOUT
})