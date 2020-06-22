import { combineReducers } from 'redux'
import ui from './reducers/ui'
import auth from './reducers/auth'
import profile from './reducers/profile'

const rootReducer = combineReducers({
	ui: ui,
	auth:auth,
	profile:profile
})

export default rootReducer
