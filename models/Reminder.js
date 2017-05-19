const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reminderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: false
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  },
}, {
  timestamps: true
})

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
