/* eslint-disable no-unused-vars */
/* eslint-disable dot-notation */
import axios from 'axios'
import { 
  CENTER_1_LAT_LNG, 
  CENTER_2_LAT_LNG, 
  CENTER_3_LAT_LNG, 
  METER_TO_MILES } from '../components/Main/Ship/Map/MapConstants'

const BASE_URL = 'http://localhost:8080'

async function getRec(weight, depLatlng, desLatlng, fragile, token) {

  const directionsService = new window.google.maps.DirectionsService()

  const dep = new window.google.maps.LatLng(depLatlng.lat, depLatlng.lng);
  const des = new window.google.maps.LatLng(desLatlng.lat, desLatlng.lng);
  const center0 = new window.google.maps.LatLng(CENTER_1_LAT_LNG.lat, CENTER_1_LAT_LNG.lng);
  const center1 = new window.google.maps.LatLng(CENTER_2_LAT_LNG.lat, CENTER_2_LAT_LNG.lng);
  const center2 = new window.google.maps.LatLng(CENTER_3_LAT_LNG.lat, CENTER_3_LAT_LNG.lng);
  const distance = {}
  distance.drone0 = window.google.maps.geometry.spherical
  .computeDistanceBetween( new window.google.maps.LatLng(CENTER_1_LAT_LNG.lat, CENTER_1_LAT_LNG.lng),  new window.google.maps.LatLng(depLatlng.lat, depLatlng.lng))*METER_TO_MILES
  distance.drone1 = window.google.maps.geometry.spherical
  .computeDistanceBetween( new window.google.maps.LatLng(CENTER_2_LAT_LNG.lat, CENTER_2_LAT_LNG.lng),  new window.google.maps.LatLng(depLatlng.lat, depLatlng.lng))*METER_TO_MILES
  distance.drone2 = window.google.maps.geometry.spherical
  .computeDistanceBetween( new window.google.maps.LatLng(CENTER_3_LAT_LNG.lat, CENTER_3_LAT_LNG.lng),  new window.google.maps.LatLng(depLatlng.lat, depLatlng.lng))*METER_TO_MILES
  distance.drone_distance_des = window.google.maps.geometry.spherical
  .computeDistanceBetween( new window.google.maps.LatLng(depLatlng.lat, depLatlng.lng),  new window.google.maps.LatLng(desLatlng.lat, desLatlng.lng))*METER_TO_MILES

  const optTemplate = {
    destination: desLatlng,
    travelMode: 'BICYCLING',
    waypoints: [{location : depLatlng}]
  }

  const centers = [ CENTER_1_LAT_LNG, CENTER_2_LAT_LNG, CENTER_3_LAT_LNG ]
  const requestOpts = []
  for (let i = 0; i < centers.length; i += 1) {
    requestOpts.push({
      ...optTemplate,
      origin: centers[i]
    })
  }
  
  let resp 
  
  const robotDistances = await Promise.all([
    directionsService.route(requestOpts[0], 
      (response, status) => {
        const respData = response.routes[0].legs
        distance.robot0 = respData[0].distance.value * METER_TO_MILES
        distance.robot_distance_des = respData[1].distance.value * METER_TO_MILES
      }),
    directionsService.route(requestOpts[1], 
      (response, status) => {
        const respData = response.routes[0].legs
        distance.robot1 = respData[0].distance.value * METER_TO_MILES
      }),
    directionsService.route(requestOpts[2],
      (response, status) => {
        const respData = response.routes[0].legs
        distance.robot2 = respData[0].distance.value * METER_TO_MILES
      })
  ]).then(() => {
    resp = axios({
      method: 'get',
      url: `${BASE_URL}/order/get_recommend?drone_distance_0=${distance.drone0}&drone_distance_1=${distance.drone1}&drone_distance_2=${distance.drone2}&drone_distance_des=${distance.drone_distance_des}` +
      `&robot_distance_0=${distance.robot0}&robot_distance_1=${distance.robot1}&robot_distance_2=${distance.robot2}&robot_distance_des=${distance.robot_distance_des}&weight=${weight}&is_fragile=${fragile}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  })
  .catch(err => console.log(err))

  return resp
}

export default getRec