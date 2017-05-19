const mongoose = require('mongoose')
const Schema = mongoose.Schema

const location = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  latitude: {
    type: String
  },
  longitude: {
    type: String
  }
})

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
