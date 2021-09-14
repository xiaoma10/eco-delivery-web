import * as types from '../contants/ActionTypes'

const initialState = {
  firstname: null,
  lastname: null,
  latlng: null,
  address: null,
  adrLineTwo: null,
  zipcode: null,
  phone: null, 
  email: null
}

// action 
const senderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PICKUP_LOCATION_SELECTED:
      return {
        ...state,
        address: action.address,
        zipcode: action.zipcode,
        latlng: action.latlng
      }
    case types.PICKUP_LOCATION_LINE_TWO_FILLED:
      return {
        ...state,
        adrLineTwo: action.adrLineTwo
      }
    case types.SENDER_FIRST_NAME_FILLED: 
      return {
        ...state,
        firstname: action.firstname
      }
    case types.SENDER_LAST_NAME_FILLED: 
      return {
        ...state,
        lastname: action.lastname
      }
    case types.SENDER_PHONE_FILLED:
      return {
        ...state,
        phone: action.phone
      }
    case types.SENDER_EMAIL_FILLED:
      return {
        ...state,
        email: action.email
      }
    case types.SENDER_RESET:
      return {
        ...initialState
      }
    default: 
      return state
  } 
}

export default senderReducer