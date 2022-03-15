const mongoose = require('../database/mongo')

const ClienteSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  telefone: {
    type: String
  },
  consentimento: {
    type: Boolean
  }
})

const Cliente = mongoose.model('Cliente', ClienteSchema)

async function create(clientBody) {
  const emailEncontrado = await Cliente.findOne({ email: clientBody.email })
  if (emailEncontrado) {
    await Cliente.updateOne({ _id: emailEncontrado.id }, { ...clientBody })
    return { ...clientBody }
  }

  const clienteCriado = await Cliente.create(clientBody)
  const { name, email, telefone, consentimento } = clienteCriado

  return { name, email, telefone, consentimento }
}

async function listar() {
  const lista = await Cliente.find()

  const listaClientes = lista.map(cliente => {
    const { name, email, telefone, consentimento } = cliente
    return { name, email, telefone, consentimento }
  })

  return listaClientes
}

module.exports = { create, listar }
