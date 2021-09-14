import React from 'react'
import { Button, Collapse, message } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { pageDecrement, collapseDecrement } from '../../../../../actions/pageAction'
import PersonalInfo from './PersonalInfo'
import SummaryPerson from './SummaryPerson'
import SummaryOrder from './SummaryOrder'
import Api from '../../../../../utils/Api'
import ISODateString from '../../../../../utils/ISODateString'
import { onOrderNumberReturn } from '../../../../../actions/orderAction'

function FillAddress() {

  const user = useSelector(state => state.user)
  const item = useSelector(state => state.item)
  const order = useSelector(state => state.order)
  const page = useSelector(state => state.page)
  const sender = useSelector(state => state.sender)
  const receiver = useSelector(state => state.receiver)
  const dispatch = useDispatch()
  const history = useHistory()

  function handleCollapseBack() {
    dispatch(collapseDecrement())
  }

  function handleBackOnClick() {
    dispatch(pageDecrement('recommendation'))
  }

  function handleBackKeyUp() {
    dispatch(pageDecrement('recommendation'))
  }

  // at this point, all order related information has been all recorded in store
  async function onSubmit() {
    let orderInfo
    if (order.method === 'drone') {
      orderInfo = {
        agentType: 1,
        cost: order.drone.price,
        pickupTime: order.drone.pickupTime,
        deliveredTime: order.drone.deliveryTime,
        centerID: order.drone.centerID
      }
    } else {
      orderInfo = {
        agentType: 0,
        cost: order.robot.price,
        pickupTime: order.robot.pickupTime,
        deliveredTime: order.robot.deliveryTime,
        centerID: order.robot.centerID
      }
    }
    // fill in request body 
    const requestBody = {
      "departure": sender.address,
      "depLat": sender.latlng.lat,
      "depLng": sender.latlng.lng,
      "destination": receiver.address,
      "desLat": receiver.latlng.lat,
      "desLng": receiver.latlng.lng,
      "status": 0,
      "orderedTime": `${ISODateString(new Date(Date.now()))}`,
      "pickupTime": `${ISODateString(orderInfo.pickupTime)}`,
      "deliveredTime": `${ISODateString(orderInfo.deliveredTime)}`,
      "cost": orderInfo.cost,
      "rating": null,
      "centerID": orderInfo.centerID,
      "agentType": orderInfo.agentType,
      "sender": {
          "firstName": sender.firstname,
          "lastName": sender.lastname,
          "address": sender.address,
          "phoneNumber": sender.phone,
          "email": sender.email
      },
      "recipient": {
          "firstName": receiver.firstname,
          "lastName": receiver.lastname,
          "address": receiver.address,
          "phoneNumber": receiver.phone,
          "email": receiver.email
      },
      "item": {
          "weight": item.weight,
          "isFragile": item.isFragile,
          "type": item.description,
          "amount": 1
      },
      "account": {
          "id": user.id
      },
      "useRecommendation": null
    }  

    const api = new Api(user.token)
    let resp
    try {
      resp = await api.placeOrder(requestBody)
      const {orderNumber} = resp.data
      // delete or not
      dispatch(onOrderNumberReturn(orderNumber))
      history.push({
        pathname: '/complete',
        state: {
          orderID: orderNumber
        }
      })
    } catch(err) {
      // eslint-disable-next-line no-console
      console.log(err)
      message.error(`${err.response.data.message}`, 4)
    }
  }

  return (
    <div >
      <div
        style={{'cursor': 'pointer', 'marginTop': '2em'}}
        onClick={handleBackOnClick}
        onKeyUp={handleBackKeyUp}
        role="button"
        tabIndex={0}> 
        <LeftOutlined style={{'fontSize': '20px'}}/>
      </div>
      <h1
        style={{'marginTop': '1em'}}>Shipping by {order.method}</h1>
      <Collapse 
        accordion
        activeKey={page.collapseActiveKey}>
          <Collapse.Panel 
            header="1. Sender address"
            key="0">
              <PersonalInfo type="sender" />
            </Collapse.Panel>
          <Collapse.Panel 
            header="2. Recipient address"
            key="1">
            <PersonalInfo type="receiver" />
            </Collapse.Panel>
          <Collapse.Panel 
            header="3. Order summary"
            key="2">
              <SummaryPerson type="sender" />
              <SummaryPerson type="receiver" />
              <SummaryOrder />
              <Button
                style={{'marginRight': '14px'}}
                type="primary"
                onClick={onSubmit}>Submit</Button>
              <Button
                onClick={handleCollapseBack}>Edit</Button>
            </Collapse.Panel>
        </Collapse>
    </div>
  )
}

export default FillAddress