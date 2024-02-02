function CreateApiKeyHandler (db) {
  async function checkIfApiKeyExists (ctx) {
    const { id } = ctx.query
    if (!id) {
      ctx.status = 400
      ctx.body = { error: 'id query param not provided' }
      return
    }
    const users = await db.readAll('users')

    const idExists = users.map((user) => {
      return user.id.includes(id)
    })

    if (idExists.includes(true)) {
      ctx.status = 200
      return
    }

    ctx.status = 404
  }

  return {
    checkIfApiKeyExists
  }
}

module.exports = CreateApiKeyHandler
