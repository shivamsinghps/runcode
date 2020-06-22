const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user_dataSchema = new Schema({

  firstName: {type: String, required:true},
  secondName: {type: String, required:true},
  address: {type: String, required:true},
  email: {type: String, required:true, unique:true},
  firstPhone: {type: String, required:true, unique:true},
  secondPhone: {type: String},
  city: {type: String, required:true},
  state: {type: String, required:true},
  zipCode: {type: String, required:true},
  country: {type: String, required:true}
})

module.exports = mongoose.model('UserData',user_dataSchema)
