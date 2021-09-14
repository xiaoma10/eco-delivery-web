import * as types from '../contants/ActionTypes'

export const onAddressUpdate = (address, zipcode, latlng) => ({
  type: types.PICKUP_LOCATION_SELECTED,
  address,
  zipcode,
  latlng
})

export const onAddressSecondLineUpdate = (adrLineTwo) => ({
  type: types.PICKUP_LOCATION_LINE_TWO_FILLED,
  adrLineTwo
})

export const onZipcodeUpdate = (zipcode) => ({
  type: types.PICKUP_ZIPCODE_FILLED,
  zipcode
})

export const onFirstNameUpdate = (firstname) => ({
  type: types.SENDER_FIRST_NAME_FILLED,
  firstname
})

export const onLastNameUpdate = (lastname) => ({
  type: types.SENDER_LAST_NAME_FILLED,
  lastname
})

export const onPhoneUpdate = (phone) => ({
  type: types.SENDER_PHONE_FILLED,
  phone
})

export const onEmailUpdate = (email) => ({
  type: types.SENDER_EMAIL_FILLED,
  email
})

export const senderReset = () => ({
  type: types.SENDER_RESET
})