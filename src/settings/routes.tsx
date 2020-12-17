const prodUrl = 'http://localhost:3000/'
const routeApi = 'api/v1'

export const ROUTES = {
	routeUrl: prodUrl,
	routeApi,
	agenda: {
		list: {
			url: `sample`,
			type: 'get'
		},
		create: {
			url: `sample`,
			type: 'post'
		},
		delete: {
			url: `sample`,
			type: 'delete'
		},
		edit: {
			url: (id: string) => `agenda/${id}`,
			type: 'put'
		}
	}
}
