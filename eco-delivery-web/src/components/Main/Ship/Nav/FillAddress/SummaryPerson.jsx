import React from 'react'
import { useSelector } from 'react-redux'
import './SummaryPerson.css'

function SummaryPerson(props) {

  const { type } = props

  const sender = useSelector(state => state.sender)
  const receiver = useSelector(state => state.receiver)

  return (
    <div>
      <div className="person-info-title">{ type === "sender" ? 'Sender Information' : 'Recipient Information'}</div>
      <hr />
      {
        type === "sender" ?
          (
          <>
            <span>Name: </span>
            <span className="person-info">{`${sender.firstname} ${sender.lastname}`}</span>
            <br />
            <span>Address: </span>
            <span className="person-info">{`${sender.address}`}</span>
            <br />
            <span className="person-info">{`${sender.adrLineTwo}`}</span>
            <br />
            <span className="person-info">{`${sender.zipcode}`}</span>
            <br />
            <span>Phone number: </span>
            <span className="person-info">{`${sender.phone}`}</span>
            <br />
            <span>Email: </span>
            <span className="person-info">{`${sender.email}`}</span>
            </>
          ) :
          (
          <>
            <span>Name: </span>
            <span className="person-info">{`${receiver.firstname} ${receiver.lastname}`}</span>
            <br />
            <span>Address: </span>
            <span className="person-info">{`${receiver.address}`}</span>
            <br />
            <span className="person-info">{`${receiver.adrLineTwo}`}</span>
            <br />
            <span className="person-info">{`${receiver.zipcode}`}</span>
            <br />
            <span>Phone number: </span>
            <span className="person-info">{`${receiver.phone}`}</span>
            <br />
            <span>Email: </span>
            <span className="person-info">{`${receiver.email}`}</span>
          </>
          )
      }
      <hr />
      <br/>
    </div> 
  )
}

export default SummaryPerson