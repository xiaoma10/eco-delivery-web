import React from 'react'
import { Form, Input, InputNumber, Checkbox, Button, message } from 'antd'
import GeoSuggest from 'antd-geosuggest'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { onSimpleOrderSubmit, itemReset } from '../../../../../actions/itemAction'
import { pageIncrement } from '../../../../../actions/pageAction'
import { onQuoteReturn, orderReset } from '../../../../../actions/orderAction'
import { onAddressUpdate as pickupAddressUpdate, senderReset } from '../../../../../actions/senderAction'
import { onAddressUpdate as dropoffAddressUpdate, receiverReset} from '../../../../../actions/receiverAction'
import getRec from '../../../../../utils/getRec'


// [sw, ne] 
const sw = {
  lat: 37.7109361,
  lng: -122.3923202
}
const ne = {
  lat: 37.7858115,
  lng: -122.5033145
}

function QuoteOrder() {
  const history = useHistory()
  const dispatch = useDispatch()
  const sender = useSelector(state => state.sender)
  const receiver = useSelector(state => state.receiver)
  const user = useSelector(state => state.user)
  
  const geoBound = new window.google.maps.LatLngBounds(sw, ne)

  async function handleQuoteSubmit(formData) {
    if (!user.loggedIn) {
      dispatch(senderReset())
      dispatch(receiverReset())
      history.push('/login')
      return 
    }  
    const { weight, description } = formData
    let { fragile } = formData
    if (fragile === undefined) {
      fragile = false
    }
    dispatch(onSimpleOrderSubmit(weight, description, fragile))
    let resp 
    try {
      resp = await getRec(weight, sender.latlng, receiver.latlng, fragile, user.token)
      const droneData = resp.data[0]
      const robotData = resp.data[1]
      const robot = {
        centerID: parseInt(robotData.dispatch_center_id.slice(-1), 10),
        price: Math.round(parseFloat(robotData.cost)),
        pickupTime: new Date(robotData.pickip_time),
        deliveryTime: new Date(robotData.delivery_time)
      }
      const drone = {
        centerID: parseInt(droneData.dispatch_center_id.slice(-1), 10),
        price: Math.round(parseFloat(droneData.cost)),
        pickupTime: new Date(droneData.pickip_time),
        deliveryTime: new Date(droneData.delivery_time)
      }
      dispatch(onQuoteReturn(robot, drone))
      dispatch(pageIncrement('quoteOrder'))
      dispatch(senderReset())
      dispatch(receiverReset)
      dispatch(itemReset())
      dispatch(orderReset())
    } catch(err) {
      message.err('Failed to get quote information! ', 3)
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }

  function handleOriginSelected(result) {
    if (result.length === 0) {
      dispatch(pickupAddressUpdate(null, null, null))
      return
    }
    const query = result[0].gmaps.formatted_address 
    const querySplitArray = query.split(", ")
    const zip = querySplitArray[querySplitArray.length - 2].split(" ")[1]
    dispatch(pickupAddressUpdate(result[0].address, zip, {
      lat: result[0].lat,
      lng: result[0].lng
    }))
  }

  function handleDestinationSelected(result) {
    if (result.length === 0) {
      dispatch(dropoffAddressUpdate(null, null, null))
      return
    }
    const query = result[0].gmaps.formatted_address 
    const querySplitArray = query.split(", ")
    const zip = querySplitArray[querySplitArray.length - 2].split(" ")[1]
    dispatch(dropoffAddressUpdate(result[0].address, zip, {
      lat: result[0].lat,
      lng: result[0].lng
    }))
  }

  const validateMessages = {
    // eslint-disable-next-line no-template-curly-in-string
    required: '${label} is required!',
    number: {
      // eslint-disable-next-line no-template-curly-in-string
      range: '${label} must be between ${min} and ${max}'
    }
  }

  return (
    <div>
    <h1>Quote a shipment</h1>
    <Form 
      layout="vertical"
      onFinish={handleQuoteSubmit}
      validateMessages={validateMessages}
      >
      <div>
        <Form.Item 
          name="pickup"
          label="Pick-up address "
          rules={[
            { required: true }
          ]}>
          <GeoSuggest 
            onChange={handleOriginSelected} 
            bounds={geoBound} />
        </Form.Item>
        <Form.Item 
          name="dropoff"
          label="Drop-off address "
          rules={[
            { required: true }
          ]}>
          <GeoSuggest 
            onChange={handleDestinationSelected} 
            bounds={geoBound} />
        </Form.Item>
      </div>
      <Form.Item 
        name="description"
        label="Description "
        rules={[
          { required: true }
        ]} >
        <Input placeholder='Enter an item description: e.g. "clothes"'/>
      </Form.Item>
      <div>
      <Form.Item 
        name="weight"
        label="Weight "
        rules={[
          { required: true },
          { type: 'number', min: 1, max: 36 }
        ]}>
        <InputNumber placeholder="Weight"/>
      </Form.Item>
      <Form.Item 
        name="fragile"
        valuePropName="checked"
        label="Is item Fragile? ">
        <Checkbox />
      </Form.Item>
      </div>
      <Form.Item>
        <Button 
          type="primary"
          htmlType="submit">
          Get Started
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}

export default QuoteOrder