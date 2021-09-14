import React, { useEffect } from 'react'
import { Tabs, Space, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import Api from '../../../utils/Api'
import OrderCard from './OrderCard'
import { onOrderHistoryReturn, onShowData } from '../../../actions/userAction'

const { TabPane } = Tabs

function OrderHistory() {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const { token, id } = user

  // get all orders 
  // save orders array in user (store)
  useEffect(async () => {
    const api = new Api(token)
    let resp 
    try {
      resp = await api.getAllOrders(id)
      const { PLACED, PICKED, COMPLETED, CANCELED } = resp.data
      dispatch(onOrderHistoryReturn(PLACED, PICKED, COMPLETED, CANCELED))
      dispatch(onShowData())
    } catch(err) {
      console.log('Failed to load order hisotry!', err.message)
      message.error('Failed to load order history!')
    }
  }, [])

  function renderOrderCard(obj) {
    return <OrderCard key={obj.orderNumber} orderData={obj} />
  }

  return (
    <>
      {
        user.hasData && 
        <>
          <Space style={{ marginBottom: 24 }} />
          <Tabs>
            <TabPane tab="In progress" key="1">
              <div 
                className="order-cards-container">
                {user.placed && user.placed.map(obj => renderOrderCard(obj))}
                {user.picked && user.picked.map(obj => renderOrderCard(obj))}
              </div>
            </TabPane>
            <TabPane tab="Completed" key="2">
              <div 
                className="order-cards-container">
                {user.completed && user.completed.map(obj => renderOrderCard(obj))}
              </div>
            </TabPane>
            <TabPane tab="Cancelled" key="3">
              <div 
                className="order-cards-container">
                {user.canceled && user.canceled.map(obj => renderOrderCard(obj))}
              </div>
            </TabPane>
          </Tabs>
        </> 
      }
    </>
  )

}

export default OrderHistory