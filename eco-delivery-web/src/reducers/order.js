import * as types from '../contants/ActionTypes'

const initialState = {
  method: '',
  orderNumber: null,
  robot: {
    centerID: null,
    price: null,
    pickupTime: null,
    deliveryTime: null
  }, 
  drone: {
    centerID: null,
    price: '',
    pickupTime: null,
    deliveryTime: null
  }
}

const orderReducer = (state=initialState, action) => {
  switch (action.type) {
    case types.QUOTE_RETURN:
      return {
        ...state,
        robot: action.robotQuote,
        drone: action.droneQuote
      }
    case types.ORDER_NUMBER_RETURN:
      return {
        ...state,
        orderNumber: action.orderNumber
      }
    case types.SHIP_METHOD_SELECTED:
      return {
        ...state,
        method: action.method
      }
    case types.ORDER_RESET: 
      return {
        ...initialState
      }
    default: 
      return state
  }
}

export default orderReducer