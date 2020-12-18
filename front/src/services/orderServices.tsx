import {request} from './requestServices'
import {ROUTES} from '../settings'

export function getUserOrders(userId: string) {
	const routeInfo = ROUTES.order.userOrders
	const url = ROUTES.routeUrl + routeInfo.url(userId)

	return request(url, routeInfo.type, null, null)
}

export function deleteOrder(orderId: string) {
	const routeInfo = ROUTES.order.delete
	const url = ROUTES.routeUrl + routeInfo.url(orderId)

	return request(url, routeInfo.type, null, null)
}
