export default (httpClient) => ({
    readAllUsers: async () => {
        
        const response = await httpClient.get('/users/readAllUsers')
        let errors = null
        
        if (!response.data) {
            errors = {
                status: response.request.status,
                statusText: response.request.statusText
            }
        }

        return {
            data: response.data,
            errors
        }
    },
	getCorretor: async () => {
        const response = await httpClient.get('/users/getCorretor')
        let errors = null

        if (!response.data) {
            errors = {
                status: response.request.status,
                statusText: response.request.statusText
            }
        }

        return {
            data: response.data,
            errors
        }
    },
	getMe: async () => {
		const response = await httpClient.get('/users/me')
		return {
			data: response.data
		}
	}
})
