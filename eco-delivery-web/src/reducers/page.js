import * as types from '../contants/ActionTypes'

const initialState = {
  quoteOrder: true,
  recommendation: false,
  fillAddress: false,
  nextPage: '',
  lastPage: '',
  collapseActiveKey: 0
}

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PAGE_INCREMENT:
      if (action.lastPage === 'quoteOrder') {
        return {
          ...state,
          quoteOrder: false,
          recommendation: true,
          lastPage: action.lastPage
        }
      } 
      return {
        ...state,
        recommendation: false,
        fillAddress: true,
        lastPage: action.lastPage
      }
    case types.PAGE_DECREMENT:
      if (action.nextPage === 'quoteOrder') {
        return {
          ...state,
          quoteOrder: true,
          recommendation: false,
          nextPage: action.nextPage
        }
      }
      return {
        ...state,
        recommendation: true,
        fillAddress: false,
        nextPage: action.nextPage
      }
    case types.PAGE_ON_ENTER:
      return {
        ...state,
        [state.lastPage]: false,
        lastPage: ''
      }
    case types.PAGE_ON_EXITED:
      return {
        ...state,
        [state.nextPage]: true,
        nextPage: ''
      }
    case types.COLLAPSE_INCREMENT:
      return {
        ...state,
        collapseActiveKey: state.collapseActiveKey + 1
      }
    case types.COLLAPSE_DECREMENT:
      return {
        ...state,
        collapseActiveKey: state.collapseActiveKey - 1
      }
    case types.PAGE_RESET: 
      return {
        ...initialState
      }
    default: 
      return state
  }
}

export default pageReducer