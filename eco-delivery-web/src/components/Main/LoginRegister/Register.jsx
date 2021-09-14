import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { onTokenReturn } from '../../../actions/userAction'
import Api from '../../../utils/Api'
import './LoginRegister.css'


const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
  types: {
    // eslint-disable-next-line no-template-curly-in-string
    email: '${label} is not a valid email!'
  }
}

function Register() {

  const dispatch = useDispatch()
  const history = useHistory()

  async function onRegisterFormSubmit(formData) {
    const api = new Api()
    const { firstName, lastName, email, password } = formData
    const requestBody = {
      email,
      password,
      firstName,
      lastName
    }
    let resp 
    try {
      resp = await api.register(requestBody)
      dispatch(onTokenReturn(resp.data.jwtToken, resp.data.firstName, resp.data.id))
      history.push('/')
    } catch(err) {
      console.log(err)
      message.error(`${err.response.data.message}`, 4)
    }
  }

  return (
    <div className="main-background">
      <div className="register-container">
       <h1 className="register-title">Create a new account</h1>
       <Form
        layout="vertical"
        validateMessages={validateMessages}
        onFinish={onRegisterFormSubmit}>
          <div>
            <div>
              <Form.Item
                name="firstName"
                label="First name"
                rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                name="lastName"
                label="Last name"
                rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </div>

            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
              hasFeedback>
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'))
                  }
                })
              ]}>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Register</Button>
            </Form.Item>
          </div>
       </Form>
       <div>I have an account, <Link to='/login'>Login</Link></div>
      </div>
    </div>
  )
}

export default Register
