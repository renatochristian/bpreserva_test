const { v4: uuidv4 } = require('uuid')

function CreateSchedulingHandler(db) {
    async function create(ctx) {
        const { corretor_id, cliente_id, horaInicio, horaFinal, status } = ctx.request.body

        if (!corretor_id) {
            ctx.status = 400
            ctx.body = { error: 'corretor está vazio' }
        }
        if (!cliente_id) {
            ctx.status = 400
            ctx.body = { error: 'dados de cliente vazio' }
        }
        if (!horaInicio) {
            ctx.status = 400
            ctx.body = { error: 'faltou hora inicio' }
        }
        if (!horaFinal) {
            ctx.status = 400
            ctx.body = { error: 'faltou hora final' }
        }

        if (!status) {
            ctx.status = 422
            ctx.body = { error: 'Unknown status type' }
            return
        }

        const scheduling = {
            id: uuidv4(),
            corretor_id,
            cliente_id,
            horaInicio,
            horaFinal,
            status: String(status).toUpperCase(),
            createdAt: new Date().getTime()
        }

        const inserted = await db.insert('schedulings', scheduling)
        if (inserted) {
            ctx.status = 201
            ctx.body = scheduling
            return
        }

        ctx.status = 422
        ctx.body = { error: 'Scheduling not created' }
    }

    async function readAllSchedulings(ctx) {
        const schedulings = await db.readAll('schedulings')

        if (schedulings) {
            ctx.status = 200
            ctx.body = schedulings
            return
        }

        ctx.status = 404
    }

    return {
        create,
        readAllSchedulings
    }
}

module.exports = CreateSchedulingHandler
