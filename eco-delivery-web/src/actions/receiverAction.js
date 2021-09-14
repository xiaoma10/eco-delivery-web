import * as types from '../contants/ActionTypes'

export const onAddressUpdate = (address, zipcode, latlng) => ({
  type: types.DROPOFF_LOCATION_SELECTED,
  address,
  zipcode,
  latlng
})

export const onAddressSecondLineUpdate = (adrLineTwo) => ({
  type: types.DROPOFF_LOCATION_LINE_TWO_FILLED,
  adrLineTwo
})

export const onFirstNameUpdate = (firstname) => ({
  type: types.RECEIVER_FIRST_NAME_FILLED,
  firstname
})

export const onLastNameUpdate = (lastname) => ({
  type: types.RECEIVER_LAST_NAME_FILLED,
  lastname
})

export const onPhoneUpdate = (phone) => ({
  type: types.RECEIVER_PHONE_FILLED,
  phone
})

export const onEmailUpdate = (email) => ({
  type: types.RECEIVER_EMAIL_FILLED,
  email
})

export const receiverReset = () => ({
  type: types.RECEIVER_RESET
})