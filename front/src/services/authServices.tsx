import {request} from './requestServices'
import {ROUTES} from '../settings'

export function userLogin(
	mail: string,
	password: string
): number | Promise<any> {
	const routeInfo = ROUTES.user.login
	const url = ROUTES.routeUrl + routeInfo.url

	return request(url, routeInfo.type, null, {mail, password})
}

export function getUserInfo(
	id: string
):
	| {id: number; firstName: string; lastName: string; email: string}
	| Promise<any> {
	const routeInfo = ROUTES.user.show
	const url = ROUTES.routeUrl + routeInfo.url(id)

	return request(url, routeInfo.type, null, null)
}
