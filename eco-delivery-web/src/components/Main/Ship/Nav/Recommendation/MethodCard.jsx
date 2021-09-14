import React from 'react'
import { Radio } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { onMethodUpdate } from '../../../../../actions/orderAction'
import './MethodCard.css'

// check order reducer 
// see if it is completed 
// link order reducer with method card 


const selectedStyle = {
  backgroundColor: '#38966D',
  color: 'white',
  border: 'solid 1px #38966D'
}

function MethodCard(props) {

  const { method } = props
  
  const order = useSelector(state => state.order)
  const dispatch = useDispatch()

  const quote = method === 'drone' ? order.drone : order.robot

  function handleOnClick() {
    dispatch(onMethodUpdate(method))
  }

  function handleKeyUp() {
    dispatch(onMethodUpdate(method))
  }

  const icon = (mtd) => {
    if (mtd === 'robot') {
      return '\u{1f916}'
    }
    // drone
    return '\u{2708}\u{fe0f}'
  }

  return (
    <div 
      className="method-card"
      style={ order.method === method ? {...selectedStyle} : null }
      onClick={handleOnClick}
      onKeyUp={handleKeyUp}
      role="button"
      tabIndex={0}
      >
      <div className="method-card-big-font">By {method}</div>
      <div className="method-card-icon">{icon(method)}</div>
      <Radio 
        checked={order.method === method}/>
      <div className="method-card-big-font">{`$ ${quote.price}`}</div>
      <div>Delivered by:</div>
      <div>{quote.deliveryTime && quote.deliveryTime.toDateString()}</div>
      <div>{quote.deliveryTime && quote.deliveryTime.toLocaleTimeString('en-US')}</div>
    </div>
  )
}

export default MethodCard