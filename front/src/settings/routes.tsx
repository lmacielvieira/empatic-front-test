import {Method} from 'axios'

const prodUrl = 'http://localhost:3000/'
const routeApi = 'api/v1'

interface RouteConfig {
	[key: string]:
		| {
				[key: string]: {
					url: any
					type: Method
				}
		  }
		| string
		| any
}

export const ROUTES: RouteConfig = {
	routeUrl: prodUrl,
	routeApi,
	user: {
		show: {
			url: (id: string) => `users/${id}`,
			type: 'get'
		},
		login: {
			url: `login`,
			type: 'post'
		}
	},
	order: {
		userOrders: {
			url: (id: string) => `users/${id}/orders`,
			type: 'get'
		},
		delete: {
			url: (id: string) => `orders/${id}`,
			type: 'delete'
		}
	}
}
