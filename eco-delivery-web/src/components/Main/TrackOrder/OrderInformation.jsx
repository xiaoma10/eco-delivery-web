import React, { useState, useEffect } from 'react'
import { Button, message } from 'antd'
import { useSelector, useDispatch  } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { LeftOutlined } from '@ant-design/icons'
import { onAddressUpdate as senderAddressUpdate } from '../../../actions/senderAction'
import { onAddressUpdate as receiverAddressUpdate } from '../../../actions/receiverAction'
import { onMethodUpdate } from '../../../actions/orderAction'
import Api from '../../../utils/Api'
import Agent from './Agent'

function OrderInformation(props) {

  const { orderID } = props
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const [show, setShow] = useState(false)
  const [orderDetails, setOrderDetails] = useState(null)
  const [cancellable, setCancellable] = useState(true)

  function handleBackOnClick() {
    history.goBack()
  }

  function handleBackKeyUp() {
    history.goBack()
  }

  function handleCancel() {
    
  }
  
  useEffect(async () => {
    const api = new Api(user.token)
    try {
      const resp = await api.getOrderDetails(orderID)
      if (resp.data.status === 'CANCELED') {
        setCancellable(false)
      }
      dispatch(senderAddressUpdate(null, null, {lat: resp.data.depLat, lng: resp.data.depLng}))
      dispatch(receiverAddressUpdate(null, null, {lat: resp.data.desLat, lng: resp.data.desLng}))
      dispatch(onMethodUpdate(resp.data.agentType.toLowerCase()))
      setOrderDetails(resp)
      setShow(true)
    } catch(err) {
      // eslint-disable-next-line no-console
      console.log(err.message)
      message.error('Failed to load order details!')
    }
  }, []) 

  return (
    show &&
      <div className="track-grid">
        <div className="track-icon">
          <div
            style={{'cursor': 'pointer', 'marginTop': '2em'}}
            onClick={handleBackOnClick}
            onKeyUp={handleBackKeyUp}
            role="button"
            tabIndex={0}> 
            <LeftOutlined style={{'fontSize': '20px'}} />
          </div>
          <Agent info={orderDetails.data.agentType} />
        </div>
        <div className="track-title">
          <br/>
          <br/>
          <br/>
          <div>
              Type of Object: {orderDetails.data.item.type}
          </div>
        </div>

        <div className="track-empty-grid" />
        <div className="track-order-info">
          Created on: {orderDetails.data.orderedTime}
          <br />
          Weight of Object: {orderDetails.data.item.weight}
          <br />
          Amount Paid: {orderDetails.data.cost ? orderDetails.data.cost : 0}
        </div>

        <div className="track-sender-title">Sender Information:</div>
        <div className="track-sender-info">
          <p className="sender-info">
            First Name: {orderDetails.data.sender.firstName} <br/>
            Last Name: {orderDetails.data.sender.lastName} <br/>
            Address: {orderDetails.data.sender.address} <br/>
            Email: {orderDetails.data.sender.email} <br/>
            Phone: {orderDetails.data.sender.phoneNumber}
          </p>
        </div>

        <div className="track-receiver-title">Receiver Information:</div>
        <div className="track-receiver-info">
          <p className="sender-info">
            First Name: {orderDetails.data.recipient.firstName} <br/>
            Last Name: {orderDetails.data.recipient.lastName} <br/>
            Address: {orderDetails.data.recipient.address} <br/>
            Email: {orderDetails.data.recipient.email} <br/>
            Phone: {orderDetails.data.recipient.phoneNumber}
          </p>
        </div>
        {
          cancellable &&
          <div className="cancel">
              <Button className="cancel-btn" onClick={handleCancel}>Cancel Order</Button>
          </div>
        }
      </div>
      
  )
}

export default OrderInformation