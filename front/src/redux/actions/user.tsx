import {LOGIN, LOGOUT} from '../mapping'

export function login() {
	return {
		type: LOGIN
	}
}

export function logout() {
	return {
		type: LOGOUT
	}
}
