const Koa = require('koa')
const Router = require('koa-router')
const jwt = require('koa-jwt')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')

const database = require('./database')
const CreateUserHandler = require('./handlers/users')
const CreateAuthHandler = require('./handlers/auth')
const CreateSchedulingHandler = require('./handlers/scheduling')
const CreateApiKeyHandler = require('./handlers/apikey')

const app = new Koa()
const router = new Router()

const {
  JWT_SECRET = '',
  PORT = 3000
} = process.env
const authMiddleware = jwt({ secret: JWT_SECRET })
app.use(bodyParser())
app.use(cors())

const schedulingHandler = CreateSchedulingHandler(database)
const usersHandler = CreateUserHandler(database)
const authHandler = CreateAuthHandler(database)
const apiKeyHandler = CreateApiKeyHandler(database)

router.get('/', (ctx) => {
  ctx.status = 200
  ctx.body = { message: new Date() }
})
router.head('/apikey/exists', apiKeyHandler.checkIfApiKeyExists)
router.get('/users/readAllUsers', usersHandler.readAllUsers)
router.get('/users/getCorretor', usersHandler.getCorretor)
router.post('/auth/register', usersHandler.create)
router.post('/auth/login', authHandler.login)
router.get('/users/me', authMiddleware, usersHandler.getLoggerUser)
router.get('/scheduling/readAll', schedulingHandler.readAllSchedulings)
router.post('/scheduling/register', schedulingHandler.create)

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`)
})

module.exports = app
