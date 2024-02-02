import axios from 'axios'
import { useRouter } from "vue-router";
import AuthService from './auth'
import UsersService from './users'
import SchedulingsService from './schedulings'

const router = useRouter()

const API_ENVS = {
    local: 'http://localhost:3000'
}

const httpClient = axios.create({
    baseURL: API_ENVS.local
})

httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const canThrowAnError = error.request.status === 0 || error.request.status === 500

        if (canThrowAnError) {
            throw new Error(error.message)
        }
        if (error.response.status === 401) {
            router.push({ name: 'Login' })
        }
        return error
    }
)

export default {
    auth: AuthService(httpClient),
    users: UsersService(httpClient),
	schedulings: SchedulingsService(httpClient)
}
