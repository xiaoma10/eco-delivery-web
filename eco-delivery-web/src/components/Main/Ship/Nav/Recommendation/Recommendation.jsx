import React from 'react' 
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import MethodCard from './MethodCard'
import { pageIncrement, pageDecrement } from '../../../../../actions/pageAction'
import { onMethodUpdate } from '../../../../../actions/orderAction'
import './Recommendation.css'

function Recommendation() {

  const dispatch = useDispatch()

  function handleContinue() {
    dispatch(pageIncrement('recommendation'))
  }

  function handleBack() {
    dispatch(onMethodUpdate(''))
    dispatch(pageDecrement('quoteOrder'))
  }

  return (
    <div>
      <h1>Choose a shipping method</h1>
      <div className="rec-cards-container">
      <MethodCard method="robot" />
      <MethodCard method="drone" />
      </div>
      <div>
        <Button 
          className="rec-continue"
          type="primary"
          onClick={handleContinue}>Continue</Button>
        <Button
          type="default"
          onClick={handleBack}>Back</Button>
      </div>
    </div>
  )
}

export default Recommendation