import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import {History} from 'history'
import userReducer from './reducers/user'

export const rootReducer = (history: History<any>) =>
	combineReducers({
		router: connectRouter(history),
		userReducer
	})
