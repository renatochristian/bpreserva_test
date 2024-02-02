const { v4: uuidv4 } = require('uuid')

function CreateUserHandler(db) {
    async function getLoggerUser(ctx) {
        const { id } = ctx.state.user
        const user = await db.readOneById('users', id)
        if (!user) {
            ctx.status = 404
            ctx.body = { error: 'Not found' }
            return
        }

        const userResponse = {
            ...user,
            apiKey: user.apiKey[user.apiKey.length - 1]
        }

        delete userResponse.password
        ctx.status = 200
        ctx.body = userResponse
    }

    async function generateApiKey(ctx) {
        const apiKey = uuidv4()
        const { id } = ctx.state.user

        const user = await db.readOneById('users', id)
        const updated = await db.update('users', id, {
            apiKey: [...user.apiKey, apiKey]
        })
        if (updated) {
            ctx.status = 202
            ctx.body = { apiKey }
            return
        }
        ctx.status = 422
        ctx.body = { error: 'User not updated' }
    }

    async function create(ctx) {
        const { name, email, telephone, profile, password } = ctx.request.body

        if (!name) {
            ctx.status = 400
            ctx.body = { error: 'name is empty' }
            return
        }
        if (!email) {
            ctx.status = 400
            ctx.body = { error: 'email is empty' }
            return
        }
        if (!telephone) {
            ctx.status = 400
            ctx.body = { error: 'telephone is empty' }
            return
        }
        if (!profile) {
            ctx.status = 400
            ctx.body = { error: 'profile is empty' }
            return
        }
        if (!password) {
            ctx.status = 400
            ctx.body = { error: 'password is empty' }
            return
        }

        const user = {
            id: uuidv4(),
            name,
            email,
            telephone,
            profile: String(profile).toUpperCase(),
            password,
            apiKey: [uuidv4()],
            createdAt: new Date().getTime()
        }

        const inserted = await db.insert('users', user)
        if (inserted) {
            ctx.status = 201
            ctx.body = user
            return
        }

        ctx.status = 422
        ctx.body = { error: 'User not created' }
    }

	async function getCorretor(ctx) {
        
		const users = await db.readAll('users')

        if (users) {
			const corretores = users.filter(user => user.profile === "CORRETOR");

			if(corretores){
				const reducedList = corretores.map(({ id, name }) => ({ id, name }));

				ctx.status = 200
				ctx.body = reducedList
				return
			}
			return
        }

        ctx.status = 404
    }

    async function readAllUsers(ctx) {
        
		const users = await db.readAll('users')

        if (users) {
            ctx.status = 200
            ctx.body = users
            return
        }

        ctx.status = 404
    }

    return {
        create,
        generateApiKey,
        getLoggerUser,
        readAllUsers,
		getCorretor
    }
}

module.exports = CreateUserHandler
