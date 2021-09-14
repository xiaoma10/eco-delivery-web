import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import {
  NUM_OF_WAREHOUSES,
  MAP_STYLE_JSON,
  SAN_FRANCISCO_LAT_LNG,
  CENTER_1_LAT_LNG,
  CENTER_2_LAT_LNG,
  CENTER_3_LAT_LNG,
  WAREHOUSE_MARKER
} from './MapConstants'

const warehouseMarkerOpt = {
  path: WAREHOUSE_MARKER.path,
  fillColor: WAREHOUSE_MARKER.fillColor,
  fillOpacity: 1,
  strokeWeight: 1,
  strokeColor: 'white',
  rotation: 0,
  scale: 0.045
}

const mapInitOpt = {
  zoom: 12,
  center: SAN_FRANCISCO_LAT_LNG,
  zoomControl: true,
  scaleControl: true,
  disableDefaultUI: true,
  styles: MAP_STYLE_JSON
}

const centersLatlng = [CENTER_1_LAT_LNG, CENTER_2_LAT_LNG, CENTER_3_LAT_LNG]

function GoogleMap() {

  const googleMapRef = useRef()
  let map
  const directionsService = new window.google.maps.DirectionsService()
  const directionsRenderer = new window.google.maps.DirectionsRenderer()
  const pickupMarker = new window.google.maps.Marker() 
  const sendtoMarker = new window.google.maps.Marker()
  const polyline = new window.google.maps.Polyline({
    geodesic: true,
    strokeColor: "#33a66e",
    strokeOpacity: 0.5,
    strokeWeight: 6,
  })
  const warehouseMarkers = []

  const sender = useSelector(state => state.sender)
  const receiver = useSelector(state => state.receiver)
  const order = useSelector(state => state.order)
  const { method } = order

  function setMarker(marker, latlng) {
    marker.setPosition(latlng)
    marker.setMap(map)
  }

  function drawLine(pline, locations) {
    pline.setPath(locations)
    pline.setMap(map)
  }

  function drawDirection(dirService, dirRenderer, locations) {
    dirService.route(
      {
        origin: locations[0],
        destination: locations[1],
        travelMode: window.google.maps.TravelMode.WALKING
      },
      (response, status) => {
        if (status === 'OK') {
          dirRenderer.setDirections(response)
        } else {
          // eslint-disable-next-line no-console
          console.log(`Directions request failed due to ${  status}`)
        }
      }
    )
  }

  useEffect(() => {
    map = new window.google.maps.Map(googleMapRef.current, mapInitOpt)
    directionsRenderer.setMap(map)
    for (let i = 0; i < NUM_OF_WAREHOUSES; i += 1) {
      warehouseMarkers.push(new window.google.maps.Marker({
        icon: {
          ...warehouseMarkerOpt,
          anchor: new window.google.maps.Point(400, 400),
        },
        position: centersLatlng[i],
        map
      }))
    }
  })

  useEffect(() => {
    pickupMarker.setMap(null)
    sendtoMarker.setMap(null)
    polyline.setMap(null)
    directionsRenderer.setMap(null)
    
    const newLocations = [sender.latlng, receiver.latlng]
    if (!newLocations.includes(null)) {
      if (method === undefined) {
        drawLine(polyline, newLocations)
        directionsRenderer.setMap(map)
        drawDirection(directionsService, directionsRenderer, newLocations)
      }
      if (method === 'drone') {
        setMarker(pickupMarker, sender.latlng)
        setMarker(sendtoMarker, receiver.latlng)
        drawLine(polyline, newLocations)
      }
      if (method === 'robot') {
        directionsRenderer.setMap(map)
        drawDirection(directionsService, directionsRenderer, newLocations)
      }
    }
  })

  useEffect(() => {
    pickupMarker.setMap(null)
    sendtoMarker.setMap(null)
    polyline.setMap(null)
    directionsRenderer.setMap(null)
    
    const newLocations = [sender.latlng, receiver.latlng]
    if (!newLocations.includes(null)) {
      if (method === 'drone') {
        setMarker(pickupMarker, sender.latlng)
        setMarker(sendtoMarker, receiver.latlng)
        map.panToBounds(
          new window.google.maps.LatLngBounds(pickupMarker.getPosition(), sendtoMarker.getPosition())
          )
        drawLine(polyline, newLocations)
        map.setZoom(14)
      }
      if (method === 'robot') {
        directionsRenderer.setMap(map)
        drawDirection(directionsService, directionsRenderer, newLocations)
      }
    }
  }, [method])

  return (
    <div
      id="google-map"
      ref={googleMapRef}
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default GoogleMap