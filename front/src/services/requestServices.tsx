import axios, {AxiosRequestConfig, Method} from 'axios'

export async function request(
	url: string,
	method: Method,
	customHeaders: any,
	parameters: any
) {
	let headers = customHeaders
	if (!headers) {
		headers = {
			'Content-Type': 'application/json'
		}
	} else {
		headers['Content-Type'] = headers['Content-Type']
			? headers['Content-Type']
			: 'application/json'
	}

	// remove if needs to accept blob or other type
	headers.Accept = 'application/json'

	const config: AxiosRequestConfig = {
		method,
		url,
		headers,
		data: parameters ? JSON.stringify(parameters) : {}
	}

	if (!parameters || (parameters && Object.keys(parameters).length === 0)) {
		delete config.data
	}
	const instance = axios.create()

	return instance(config)
		.then((response) => {
			return new Promise((resolve, reject) => {
				if (response.status >= 200 && response.status <= 299) {
					if (response.data || response.status === 204) {
						resolve(response.data)
					} else {
						reject(response)
					}
				}
			})
		})
		.catch((error) => {
			const response = {
				message:
					error.response && error.response.data && error.response.data.message
						? error.response.data.message
						: 'unexpected error occurred :(',
				error:
					(error.response && error.response.data && error.response.data.error
						? error.response.data.error
						: null) || (error.response ? error.response.error : null),
				status: error.response ? error.response.status : null,
				content: error.response
			}

			return new Promise((resolve, reject) => {
				reject(response)
			})
		})
}
