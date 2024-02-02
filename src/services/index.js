import axios from 'axios'
import { useRouter } from "vue-router";
import { UserModule } from '..stores/index'
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

// httpClient.interceptors.request.use((config) => {
//     const token = window.localStorage.getItem('token')
// 	console.log("passou pelo token",token)
//     if (token) {
// 		config.headers.common.Authorization = `Bearer ${token}`
// 		console.log("auth",config.headers.common.Authorization)
//     }
//     return config
// })

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
