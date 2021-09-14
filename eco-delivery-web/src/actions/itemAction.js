import * as types from '../contants/ActionTypes'

export const onSimpleOrderSubmit = (weight, description, isFragile) => ({
  type: types.SIMPLE_ORDER_SUBMIT,
  weight,
  description,
  isFragile
})

export const onItemWeightSelected = (weight) => ({
  type: types.ITEM_WEIGHT,
  payload: weight
})

export const onItemDescriptionFilled = (description) => ({
  type: types.ITEM_DESCRIPTION,
  payload: description
})

export const onFragileSelected = (isFragile) => ({
  type: types.ITEM_FRAGILE,
  payload: isFragile
})

export const itemReset = () => ({
  type: types.ITEM_RESET
})