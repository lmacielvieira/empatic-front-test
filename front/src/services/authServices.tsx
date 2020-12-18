import {request} from './requestServices'
import {ROUTES} from '../settings'

export function login(mail: string, password: string) {
	const routeInfo = ROUTES.user.login
	const url = ROUTES.routeUrl + routeInfo.url

	return request(url, routeInfo.type, null, {mail, password})
}

export function getInfo(id: string) {
	const routeInfo = ROUTES.user.show
	const url = ROUTES.routeUrl + routeInfo.url(id)

	return request(url, routeInfo.type, null, null)
}
