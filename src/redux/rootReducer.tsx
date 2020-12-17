import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import {History} from 'history'
import contactsReducer from './reducers/contacts'

export const rootReducer = (history: History<any>) =>
	combineReducers({
		router: connectRouter(history),
		contactsReducer
	})
