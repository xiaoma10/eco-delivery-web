import * as types from '../contants/ActionTypes'

export const onMethodUpdate = (method) => ({
  type: types.SHIP_METHOD_SELECTED,
  method
})

export const onQuoteReturn = (robotQuote, droneQuote) => ({
  type: types.QUOTE_RETURN,
  robotQuote,
  droneQuote
})

export const onOrderNumberReturn = (orderNumber) => ({
  type: types.ORDER_NUMBER_RETURN,
  orderNumber
})

export const orderReset = () => ({
  type: types.ORDER_RESET
})