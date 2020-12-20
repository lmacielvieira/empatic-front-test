import update from 'immutability-helper'
import {LOGIN, LOGOUT} from '../mapping'

const INITIAL_STATE = {
	isLogged: false,
	userId: -1
}

export default function userReducer(
	state = INITIAL_STATE,
	action: {type: any; sample: any; id: number}
) {
	switch (action.type) {
		case LOGIN:
			return update(state, {
				isLogged: {
					$set: true
				},
				userId: {
					$set: action.id
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
