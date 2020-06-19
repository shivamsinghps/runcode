const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user_dataSchema = new Schema({
  name:String,
  phoneno:String,
  userid:String,
})

module.exports = mongoose.model('UserData',user_dataSchema)
