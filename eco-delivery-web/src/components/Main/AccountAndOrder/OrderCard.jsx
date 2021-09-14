import React from 'react'
import { Card, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { DollarCircleOutlined, EllipsisOutlined } from '@ant-design/icons'

function OrderCard(props) {

  const { orderData } = props
  const { orderNumber, sender, recipient } = orderData

  return (
    <Card
      className="Card3-1">
        <Card.Meta 
          avatar={<Avatar icon={<DollarCircleOutlined />}/>}
          title={`Order ID:  ${orderNumber}`}
          description={`From ${sender.address} To ${recipient.address}`} />
        <Link to={{
          pathname: '/trackorder',
          state: {
            orderID: orderNumber
          }
        }}><EllipsisOutlined key="ellipsis" /></Link>
    </Card>
  )
}

export default OrderCard