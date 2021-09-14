import React from 'react'
import GoogleMap from '../Ship/Map/GoogleMap'
import OrderInformation from './OrderInformation'
import './TrackOrder.css'

function TrackOrder(props) {

  // eslint-disable-next-line react/destructuring-assignment
  const { state } = props.location 
  const { orderID } = state
  
  return (
    <div id="track">
      <div className="track-map">
        <GoogleMap />
      </div>
      <div className="track-nav">
        <OrderInformation orderID={orderID} />
      </div>
    </div>
  )
}

export default TrackOrder