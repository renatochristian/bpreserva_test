export default (httpClient) => ({
    readAllSchedulings: async () => {
        const response = await httpClient.get('/scheduling/readAll')
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
        const response = await httpClient.get('/scheduling/readCorretor')
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
    create: async ({ corretor_id, cliente_id, horaInicio, horaFinal, status }) => {
        const response = await httpClient.post('/scheduling/register', {
            corretor_id,
            cliente_id,
            horaInicio,
            horaFinal,
            status
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
    }
    // getSchedulings: async ({ corretor_id }) => {

    //     const response = await httpClient.get('/scheduling/summary')
    //     let errors = null

    //     if (!response.data) {
    //         errors = {
    //             status: response.request.status,
    //             statusText: response.request.statusText
    //         }
    //     }

    //     return {
    //         data: response.data,
    //         errors
    //     }
    // },
})
