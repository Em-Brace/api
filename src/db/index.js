var mongoose = require('mongoose')

const { database } = require('../config')

var mongoDB = `mongodb://${database.host}:${database.port}/${database.name}`
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

var db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

module.exports = db
