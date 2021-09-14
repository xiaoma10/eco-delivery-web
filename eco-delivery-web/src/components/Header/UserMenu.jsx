import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { onLogOut } from '../../actions/userAction'
import { pageReset } from '../../actions/pageAction'
import { itemReset } from '../../actions/itemAction'
import { senderReset } from '../../actions/senderAction'
import { receiverReset } from '../../actions/receiverAction'
import { orderReset } from '../../actions/orderAction'
import './UserMenu.css'

function UserMenu() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false)

  function handleSignOut() {
    dispatch(onLogOut())
    dispatch(pageReset())
    dispatch(itemReset())
    dispatch(senderReset())
    dispatch(receiverReset())
    dispatch(orderReset())
    history.push('/')
  }

  return (
    <div 
      className="usermenu-container">
      <div 
        onMouseEnter={() => setShowMenu(true)}
        className="username-btn">{user.firstname}</div>
      { showMenu &&
        <div 
          id="dropdown"
          className="dropdown"
          onMouseLeave={() => setShowMenu(false)}>
          <Link
            className="dropdown-link"
            to={{
              pathname: '/account',
              state: {
                  tabKey: '1',
              },
            }}>Account</Link>
          <Link
            className="dropdown-link"
            to={{
              pathname: '/account',
              state: {
                  tabKey: '2',
              },
            }}>Order history</Link>
          <button 
            className="dropdown-link"
            type="button" 
            onClick={handleSignOut}>Sign Out</button>
        </div>
      }
    </div>
  )
}

export default UserMenu