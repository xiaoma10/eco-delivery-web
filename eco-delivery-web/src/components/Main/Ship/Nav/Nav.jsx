import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { pageOnEnter, pageOnExited } from '../../../../actions/pageAction'
import QuoteOrder from './QuoteOrder/QuoteOrder'
import Recommendation from './Recommendation/Recommendation'
import FillAddress from './FillAddress/FillAddress'

function Nav() {

  const page = useSelector(state => state.page)
  const dispatch = useDispatch()

  function transitionOnEnter() {
    if (page.lastPage !== '') {
      dispatch(pageOnEnter())
    } 
  }

  function transitionOnExited() {
    if (page.nextPage !== '') {
      dispatch(pageOnExited())
    }
  }

  return (
    <div 
      style={{'overflow': 'scroll'}}>
      <CSSTransition
        in={page.quoteOrder}
        timeout={{
          enter: 800,
          exit: 300
        }}
        classNames="show-quote-order"
        unmountOnExit
        onEnter={transitionOnEnter}
        onExited={transitionOnExited}>
        <QuoteOrder />
      </CSSTransition>
      <CSSTransition
        in={page.recommendation}
        timeout={{
          enter: 800,
          exit: 300
        }}
        classNames="show-recommendation"
        unmountOnExit
        onEnter={() => {
          transitionOnEnter()
        }}
        onExited={transitionOnExited}>
        <Recommendation />
      </CSSTransition>
      <CSSTransition
        in={page.fillAddress}
        timeout={{
          enter: 800,
          exit: 300
        }}
        classNames="show-address-form"
        unmountOnExit
        onEnter={transitionOnEnter}
        onExited={transitionOnExited}>
        <FillAddress />
      </CSSTransition>
    </div>
  )
}

export default Nav