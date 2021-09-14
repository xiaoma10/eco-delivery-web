import React from 'react'
import './Ship.css'
import Nav from './Nav/Nav'
import GoogleMap from './Map/GoogleMap'

function Ship() {
  return (
    <div id="ship">
      <section className="map" id="map">
        <GoogleMap />
        {/* map */}
      </section>
      <aside className="nav" id="nav">
        <Nav />
      </aside>
    </div>
  )
}

export default Ship