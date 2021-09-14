import React from 'react'
import Drone from '../../../assets/drone.png'
import Robot from '../../../assets/robot.png'

function Agent(props) {
  const { info } = props
  return (
    <div>
      {
        info === "DRONE" ?
        <img 
          src={Drone} 
          width={100} 
          height={100} 
          alt="Drone delivery" />
        :
        <img 
          src={Robot} 
          width={100} 
          height={100} 
          alt="Robot delivery" />
      }
    </div>
  )
}

export default Agent