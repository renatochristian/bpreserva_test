import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('./views/LoginView.vue'),
        meta: {
            hasAuth: false
        }
    },
    {
        path: '/sobre',
        name: 'Sobre',
        component: () => import('./views/AboutView.vue'),
        meta: {
            hasAuth: true
        }
    },
    {
        path: '/agendamentos',
        name: 'Agendamentos',
        component: () => import('./views/AgendamentosView.vue'),
        meta: {
            hasAuth: true
        }
    },
    {
        path: '/usuarios',
        name: 'Usuarios',
        component: () => import('./views/CadastroView.vue'),
        meta: {
            hasAuth: true
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: { name: 'Login' }
    }
]

export const createRouter = () =>
    _createRouter({
        history: import.meta.env.SSR ? createMemoryHistory('/') : createWebHistory('/'),
        routes
    })
