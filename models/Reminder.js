const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Location = require('../models/Location')
const locationSchema = Location.schema

const reminderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: false
  },
  location: locationSchema,
}, {
  timestamps: true
})

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
