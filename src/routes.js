const routes = require('express').Router()
const model = require('./models/cliente')

routes.get('/', async (request, response) => {
  const listaDeClientes = await model.listar()
  response.send(listaDeClientes)
})

routes.post('/', async (request, response) => {
  console.log(request.body)
  try {
    const clienteCriado = await model.create(request.body)

    response.status(201).send(clienteCriado)
  } catch (error) {
    console.log(error)
    response.status(400).send('Ocorreu um erro no cadastro.')
  }
})

module.exports = routes
