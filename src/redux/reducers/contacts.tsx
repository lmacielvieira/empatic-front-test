import update from 'immutability-helper'
import {ADD_SAMPLE} from '../mapping'

const INITIAL_STATE = {
	sample: 'sample'
}

export default function loginReducer(
	state = INITIAL_STATE,
	action: {type: any; sample: any}
) {
	switch (action.type) {
		case ADD_SAMPLE:
			return update(state, {
				sample: {
					$set: action.sample
				}
			})
		default:
			return state
	}
}
