import React, { useEffect } from 'react'
import { Tabs, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { onOrderHistoryReturn, onShowData, onAccountSummaryReturn } from '../../../actions/userAction'
import AccountDetails from './AccountDetails'
import OrderHistory from './OrderHistory'
import Api from '../../../utils/Api'
import './AccountAndOrder.css'

const { TabPane } = Tabs

function AccountAndOrder(props) {

  const { tabKey } = props
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const { token, id } = user

  // get all orders 
  // save orders array in user (store)
  useEffect(async () => {
    const api = new Api(token)
    let orderResp
    let accountResp
    try {
      orderResp = await api.getAllOrders(id)
      accountResp = await api.getAccountInfo(id)

      const { PLACED, PICKED, COMPLETED, CANCELED } = orderResp.data
      const { firstName, credits, ecoOrders } = accountResp.data
      dispatch(onAccountSummaryReturn(firstName, credits, ecoOrders))
      dispatch(onOrderHistoryReturn(PLACED, PICKED, COMPLETED, CANCELED))
      dispatch(onShowData())
    } catch(err) {
      // eslint-disable-next-line no-console
      console.log('Failed to load order hisotry!', err.message)
      message.error('Failed to load order history!')
    }
  }, [])

  return (
    <div id="account">
      <div className="account-bkg-panel">
        <div className="main-user">
          <div id="main-name">
            {user.hasData ? user.firstname : null}
          </div>
          <div className="main-credits">
            <div id="remaining-credits">
              {user.hasData ? user.credits : null}</div>
            <div>Remaining credits</div>
          </div>
          <div className="main-orders">
            <div id="total-orders">
              {user.hasData ? user.ecoOrders.length : null}</div>
            <div>Total orders</div>
          </div>
        </div>
        <Tabs
          defaultActiveKey={tabKey}>
          <TabPane tab="Account Info" key="1">
            <AccountDetails />
          </TabPane>
          <TabPane tab="Order History" key="2">
            <OrderHistory />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default AccountAndOrder