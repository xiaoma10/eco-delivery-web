import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './LoginRegister/Login'
import Register from './LoginRegister/Register'
import Ship from './Ship/Ship'
import TrackOrder from './TrackOrder/TrackOrder'
import Completion from './Completion/Completion'
import AccountAndOrder from './AccountAndOrder/AccountAndOrder'

function Main(props) {
  const { onLoggedIn, onRegistered } = props

  function login() {
    return <Login onLoggedIn={onLoggedIn} />
  }

  function register() {
    return <Register onRegistered={onRegistered} />
  }

  return (
    <div className="main">
      <Switch>
        <Route path="/" exact component={Ship} />
        <Route path="/login" render={login} />
        <Route path="/register" render={register} />
        <Route path="/complete" component={Completion} />
        <Route path="/trackorder" component={TrackOrder} />
        <Route path="/account" component={AccountAndOrder} />
      </Switch>
    </div>
    )
}

export default Main