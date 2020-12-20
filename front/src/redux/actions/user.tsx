import {LOGIN, LOGOUT} from '../mapping'

export function login(id: number) {
	return {
		type: LOGIN,
		id
	}
}

export function logout() {
	return {
		type: LOGOUT
	}
}
