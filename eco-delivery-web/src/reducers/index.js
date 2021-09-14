import { combineReducers } from 'redux'
import receiverReducer from './receiver'
import senderReducer from './sender'
import itemReducer from './item'
import pageReducer from './page'
import orderReducer from './order'
import userReducer from './user'

const rootReducer = combineReducers({
  item: itemReducer,
  receiver: receiverReducer,
  sender: senderReducer,
  page: pageReducer,
  order: orderReducer,
  user: userReducer
})

export default rootReducer