import React from 'react'
import { Form, Input, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import * as senderActions from '../../../../../actions/senderAction'
import * as receiverActions from '../../../../../actions/receiverAction'
import { collapseIncrement, collapseDecrement } from '../../../../../actions/pageAction'


const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
  types: {
    // eslint-disable-next-line no-template-curly-in-string
    email: '${label} is not a valid email!'
  }
}

const PersonalInfo = (props) => {

  const { type } = props

  const sender = useSelector(state => state.sender)
  const receiver = useSelector(state => state.receiver)
  const dispatch = useDispatch()

  function handleAddressLineTwoOnChange() {

  }

  // function handleFormValueChanges(values) {
  //   const { firstname, lastname, phone, email, adr2 } = values
  //   if (type === "sender") {
  //     dispatch(senderActions.onFirstNameUpdate(firstname))
  //     dispatch(senderActions.onLastNameUpdate(lastname))
  //     dispatch(senderActions.onAddressSecondLineUpdate(adr2))
  //     dispatch(senderActions.onPhoneUpdate(phone))
  //     dispatch(senderActions.onEmailUpdate(email))
  //   } else {
  //     dispatch(receiverActions.onFirstNameUpdate(firstname))
  //     dispatch(receiverActions.onLastNameUpdate(lastname))
  //     dispatch(receiverActions.onAddressSecondLineUpdate(adr2))
  //     dispatch(receiverActions.onPhoneUpdate(phone))
  //     dispatch(receiverActions.onEmailUpdate(email))
  //   }
  // }

  function formContinue() {
    // save and continue to next form
    dispatch(collapseIncrement())
  }

  function formBack() {
    // go back to last form 
    dispatch(collapseDecrement())
  }

  function handlePersonalInfoSubmit(formData) {
    const { firstname, lastname, phone, email, adr2 } = formData
    if (type === "sender") {
      dispatch(senderActions.onFirstNameUpdate(firstname))
      dispatch(senderActions.onLastNameUpdate(lastname))
      dispatch(senderActions.onAddressSecondLineUpdate(adr2))
      dispatch(senderActions.onPhoneUpdate(phone))
      dispatch(senderActions.onEmailUpdate(email))
    } else {
      dispatch(receiverActions.onFirstNameUpdate(firstname))
      dispatch(receiverActions.onLastNameUpdate(lastname))
      dispatch(receiverActions.onAddressSecondLineUpdate(adr2))
      dispatch(receiverActions.onPhoneUpdate(phone))
      dispatch(receiverActions.onEmailUpdate(email))
    }
    formContinue()
  }

  return (
    <Form
      initialValues={{ 
        adr1: `${type === "sender" ? sender.address : receiver.address}`,
        zipcode: `${type === "sender" ? sender.zipcode : receiver.zipcode}`
      }}
      validateMessages={validateMessages}
      onFinish={handlePersonalInfoSubmit}
      >
      <Form.Item 
        name="firstname"
        label="First name"
        rules={[
          { required: true }
        ]} >
        <Input placeholder='John'/>
      </Form.Item>
      <Form.Item 
        name="lastname"
        label="Last name"
        rules={[
          { required: true }
        ]} >
        <Input placeholder='Doe'/>
      </Form.Item>
      <Form.Item 
        name="adr1"
        label="Address line 1">
        <Input disabled/>
      </Form.Item>
      <Form.Item 
        name="adr2"
        label="Address line 2">
        <Input 
          placeholder="Optional"
          onChange={handleAddressLineTwoOnChange}/>
      </Form.Item>
      <Form.Item 
        name="zipcode"
        label="Zip code">
        <Input disabled/>
      </Form.Item>
      <Form.Item 
        name="phone"
        label="Phone number"
        rules={[
          { required: true },
          {
            validator: (_, value) => 
              value.length === 10 ? Promise.resolve() : Promise.reject(new Error('Phone number must be 10-digit!'))
          }
        ]} >
        <Input placeholder='8888888888'/>
      </Form.Item>
      <Form.Item 
        name="email"
        label="Email"
        rules={[
          { required: true },
          { type: 'email' }
        ]} >
        <Input placeholder='abc@gmail.com'/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{'marginRight': '14px'}}>
          Save
        </Button>
        {
          type === "receiver" &&
          <Button onClick={() => formBack()}>
            Back
          </Button>
        }
      </Form.Item>
    </Form>
  )
}

export default PersonalInfo