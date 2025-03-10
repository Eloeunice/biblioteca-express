import 'express-async-errors'
import express from "express"
import ConectarBanco from "./src/config/dbconnect.js"
import router from "./src/routes/index.js"
import { MongooseError } from 'mongoose'

const app = express()
app.use(express.json())

const PORT = 3000
app.use('/', router)


app.get('/', (req, res) => {
  res.send('Requisição da Biblioteca!')
})

app.use((err, req, res, next) => {
  if (err instanceof MongooseError) {
    res.json({message: 'Ocorreu um erro no banco'})
  }
  res.json({message: 'Ocorreu um erro, por favor tente novamente'})
})

app.listen(PORT, () => {
  console.log(`Biblioteca esta rodando na porta ${PORT}`)
})

const conexao = await ConectarBanco()
conexao.on('open', () => console.log('Conexão aberta'))
conexao.on('error', (error) => console.log(`Erro na conexão, ${error}`))


export default app