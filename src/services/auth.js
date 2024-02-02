import { setCurrentUser } from "../stores/user"

export default (httpClient) => ({
    register: async ({ name, email, telephone, profile, password }) => {
        const response = await httpClient.post('/auth/register', {
            name,
            email,
            telephone,
            profile,
            password
        })
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
    login: async ({ email, password }) => {
        const response = await httpClient.post('/auth/login', {
            email,
            password
        })
        let errors = null

        if (!response.data) {
            errors = {
                status: response.request.status,
                statusText: response.request.statusText
            }
        }

		setCurrentUser(email)

        return {
            data: response.data,
            errors
        }
    }
})
