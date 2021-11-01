require('dotenv/config')
const express = require('express')
const app = express()
const port = process.env.PORT
const model = require('./models/cliente')

app.use(express.json())

app.get('/', async (request, response) => {
  const listaDeClientes = await model.listar()
  response.send(listaDeClientes)
})

app.post('/', async (request, response) => {
  console.log(request.body)
  try {
    const clienteCriado = await model.create(request.body)

    response.status(201).send(clienteCriado)
  } catch (error) {
    console.log(error)
    response.status(400).send('Ocorreu um erro no cadastro.')
  }
})

app.listen(port, () => {
  console.log('O servidor está rodando na porta ' + port)
})
