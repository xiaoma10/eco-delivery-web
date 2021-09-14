import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'antd'
import { CheckCircleTwoTone } from '@ant-design/icons'
import './Completion.css'

function Completion(props) {

  // eslint-disable-next-line react/destructuring-assignment
  const { state } = props.location

  const history = useHistory()



  return (
    <div id="thank-you">
      <div className = "card" style={{backgroundColor: 'white'}}>
        <div className="thank-you-title-container">
          <CheckCircleTwoTone 
              twoToneColor="#CECECE"
              style={{fontSize: '56px', marginRight: '30px'}}/>
          <div className="thank-you-title">
              <h1>Thank you!</h1>
              <div>Your order has been placed</div>
          </div>
        </div>
        <Button
          style={{'marginBottom': '18px'}}
          type="primary"
          onClick={() => history.push('/')}>Create new shipment</Button>
        <Button
          onClick={() => history.push({ 
            pathname: '/trackorder',
            state: {
              orderID: state.orderID
            }})}>Track this order</Button>
      </div>
    </div>
  )
}

export default Completion