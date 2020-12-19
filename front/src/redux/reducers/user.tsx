import update from 'immutability-helper'
import {LOGIN, LOGOUT} from '../mapping'

const INITIAL_STATE = {
	isLogged: false
}

export default function userReducer(
	state = INITIAL_STATE,
	action: {type: any; sample: any}
) {
	switch (action.type) {
		case LOGIN:
			return update(state, {
				isLogged: {
					$set: true
				}
			})
		case LOGOUT:
			return update(state, {
				isLogged: {
					$set: false
				}
			})
		default:
			return state
	}
}
