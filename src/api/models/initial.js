var mongoose = require('mongoose')

var Schema = mongoose.Schema

var ArraySchema = new Schema({
  some_id: {
    type: String,
    required: true,
    unique: false
  },
  name: String
})

var InitalSchema = new Schema({
  name: String,
  count: Number,
  ExampleArray: [{
    some_id: {
      type: String,
      required: true,
      unique: false
    }
  }],
  exampleArrayWithSchema: [ArraySchema]
})

var InitalModel = mongoose.model('Inital', InitalSchema)

module.exports = InitalModel
