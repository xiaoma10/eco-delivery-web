import * as types from '../contants/ActionTypes'

// item 
const initialState = {
  weight: 1,
  isFragile: false,
  description: null
}

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIMPLE_ORDER_SUBMIT:
      return {
        ...state,
        weight: action.weight,
        description: action.description,
        isFragile: action.isFragile
      }
    case types.ITEM_WEIGHT:
      return {
        ...state,
        weight: action.payload
      }
    case types.ITEM_FRAGILE: 
      return {
        ...state,
        isFragile: action.payload
      }
    case types.ITEM_DESCRIPTION: 
      return {
        ...state,
        description: action.payload
      }
    case types.ITEM_RESET:
      return {
        ...initialState
      }
    default:
      return state
  }
}

export default itemReducer