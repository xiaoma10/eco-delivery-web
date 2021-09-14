import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { pageReset } from '../../actions/pageAction'
import { itemReset } from '../../actions/itemAction'
import { senderReset } from '../../actions/senderAction'
import { receiverReset } from '../../actions/receiverAction'
import { orderReset } from '../../actions/orderAction'
import './Header.css'
import logo from '../../assets/logo.svg'
import UserMenu from './UserMenu'

function Header() {

  // const { isLoggedIn, firstname, onSignout } = props
  const dispatch = useDispatch() 
  const user = useSelector(state => state.user)

  const history = useHistory()

  function handleHomeLogoOnClick() {
    dispatch(pageReset())
    dispatch(itemReset())
    dispatch(senderReset())
    dispatch(receiverReset())
    dispatch(orderReset())
    history.push('/')
  }

  function handleHomeLogoKeyUp() {
    handleHomeLogoOnClick()
  }

  return (
    <header className="header" id="header">
      <div 
       style={{'zIndex': '5'}}
        className="logo-container" 
        id="logo-container"
        role="button"
        onClick={handleHomeLogoOnClick}
        onKeyUp={handleHomeLogoKeyUp}
        tabIndex={0}
        >
        <img src={logo} className="logo-img" alt="logo"/>
        <div className="logo-text">
          <div id="name-bold">ECO</div>
          <div id='name-medium'>Delivery</div>
        </div>
      </div>

      {
        user.loggedIn ?
          <div>
            <UserMenu />
          </div>
          :
          <div className="login-register">
            <div>
              <Link to="/register" className="register" id="register-btn" >Register</Link>
            </div>
            <div>
              <Link to="/login" className="login" id="login-btn" type="text" >Login</Link>
            </div>
          </div>
      }

    </header>
  )
}

export default Header
