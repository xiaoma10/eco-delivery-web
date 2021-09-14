import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { onTokenReturn } from '../../../actions/userAction'
import Api from '../../../utils/Api'
import './LoginRegister.css'

function Login() {

  const dispatch = useDispatch()
  const history = useHistory()

  async function onLoginFormSubmit(formData) {
    const api = new Api()
    const { email, password } = formData
    const requestBody = {
      email,
      password
    }
    let resp 
    try {
      resp = await api.login(requestBody)
      dispatch(onTokenReturn(resp.data.jwtToken, resp.data.firstName, resp.data.id))
      history.push('/')
    } catch(err) {
      console.log(err)
      message.error(`${err.response.data.message}`, 4)
    }
  }
  
  return (
    <div className="main-background">
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <Form
          className="login-form"
          layout="vertical"
          onFinish={onLoginFormSubmit}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please enter your usename!' }]}>
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter your password!' }]}>
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">Login</Button>
            </Form.Item>
            <p>I don&apos;t have an account, <Link to="/register">Register</Link></p>
        </Form>
      </div>
    </div>
  )
}

export default Login