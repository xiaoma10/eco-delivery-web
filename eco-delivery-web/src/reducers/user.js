import * as types from '../contants/ActionTypes'

const initialState = {
  firstname: null,
  id: null,
  token: null,
  loggedIn: false,
  hasData: false,
  placed: [],
  picked:[],
  completed: [],
  canceled:[],
  credits: null,
  ecoOrders: null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOKEN_RETURN:
      return {
        ...state,
        token: action.token,
        firstname: action.firstname,
        id: action.id,
        loggedIn: true
      }
    case types.LOGOUT:
      return initialState
    case types.SHOW_DATA:
      return {
        ...state,
        hasData: true
      }
    case types.ACCOUNT_SUMMARY_RETURN:
      return {
        ...state,
        firstname: action.firstname,
        credits: action.credits,
        ecoOrders: action.ecoOrders
      }
    case types.ORDER_HISTORY_RETURN: 
      return {
        ...state,
        placed: action.placed,
        picked: action.picked,
        completed: action.completed,
        canceled: action.canceled
      }
    default:
      return state
  }
}

export default userReducer