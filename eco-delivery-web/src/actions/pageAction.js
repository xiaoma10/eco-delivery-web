import * as types from '../contants/ActionTypes'

export const pageIncrement = (lastPage) => ({
  type: types.PAGE_INCREMENT,
  lastPage
})

export const pageDecrement = (nextPage) => ({
  type: types.PAGE_DECREMENT,
  nextPage
})

export const collapseIncrement = () => ({
  type: types.COLLAPSE_INCREMENT
})

export const collapseDecrement = () => ({
  type: types.COLLAPSE_DECREMENT
})

export const pageOnEnter = () => ({
  type: types.PAGE_ON_ENTER
})

export const pageOnExited = () => ({
  type: types.PAGE_ON_EXITED
})

export const pageReset = () => ({
  type: types.PAGE_RESET
})