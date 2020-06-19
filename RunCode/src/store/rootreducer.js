import { combineReducers } from 'redux'
import ui from './reducers/ui'
import auth from './reducers/auth'

const rootReducer = combineReducers({
	ui: ui,
	auth:auth,
})

export default rootReducer
