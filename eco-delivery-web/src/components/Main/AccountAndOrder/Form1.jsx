/* eslint-disable no-template-curly-in-string */
import React from "react";
import { Form, Input, Button } from 'antd';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
}

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!'
  },
  number: {
    range: '${label} must be between ${min} and ${max}'
  },
}

function Form1() {
  const onFinish = (values) => {
    console.log(values)
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Form {...layout} 
    name="nest-messages" 
    onFinish={onFinish} 
    validateMessages={validateMessages}
    className="Form_Password">
      
      <Form.Item
        name={['user', 'email']}
        label="Email"
        rules={[
          { type: 'email' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 1 }}>
        <Button type="primary" htmlType="submit" className="EditButton1">
          Edit
        </Button>
        <Button 
            type="primary" 
            className="SaveButton1" 
            style={{
                'margin': '0 30px'
            }}>
          Save
        </Button>
      </Form.Item>

      <Form.Item
        name={['user', 'name']}
        label="Username"
        rules={[
          { required: false }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 1 }}>
        <Button type="primary" htmlType="submit" className="EditButton2">
          Edit
        </Button>
        <Button 
            type="primary" 
            className="SaveButton2" 
            style={{ 'margin': '0 30px' }}>
          Save
        </Button>
      </Form.Item>

    </Form>
  )
}

export default Form1
