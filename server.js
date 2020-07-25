const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const winston = require('./src/config/winston')

const errorMiddleware = require('./src/api/middlewares/error')
const routes = require('./src/api/routes')

const { nodeEnv, nodePort } = require('./src/config')
require('./src/db')

var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
}

const app = express()

app.use(cors(corsOptions))

app.use(morgan('combined', { stream: winston.stream }))

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

app.use('/api', routes)

app.listen(nodePort, () => console.log(`Example app listening on http://localhost:${nodePort}, in environment: ${nodeEnv}`))

app.use(errorMiddleware.normalizer)
app.use(errorMiddleware.notFound)
app.use(errorMiddleware.handler)

module.exports = app
