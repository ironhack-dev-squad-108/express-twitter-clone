const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tweetSchema = new Schema({
  content: { 
    type: String, 
    required: true 
  },
  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Tweet = mongoose.model('Tweet', tweetSchema)
module.exports = Tweet

