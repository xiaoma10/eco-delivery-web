import React from 'react'
import { useSelector } from 'react-redux'
import './SummaryPerson.css'
import './SummaryOrder.css'

function SummaryOrder() {

  const order = useSelector(state => state.order)

  const quote = order.method === 'drone' ? order.drone : order.robot

  return (
    <div>
      <div className="person-info-title">Order Information</div>
      <hr />
      <span>Delivery method: </span>
      <span className="person-info">{order.method === 'drone' ? 'Drone' : 'Robot'}</span>
      <br />
      <span>Pickup by: </span>
      <span className="person-info">{`${quote.pickupTime.toDateString()}`}</span>
      <br />
      <span className="person-info">{`${quote.pickupTime.toLocaleTimeString('en-US')}`}</span>
      <br />
      <br />
      <span>Delivery by: </span>
      <span className="person-info">{`${quote.deliveryTime.toDateString()}`}</span>
      <br />
      <span className="person-info">{`${quote.deliveryTime.toLocaleTimeString('en-US')}`}</span>
      <br />
      <hr />
      <span className="summary-price">{`Total: $${order.method === 'drone' ? order.drone.price : order.robot.price}`}</span>
      <br />
      <br />
    </div>

  )
}

export default SummaryOrder