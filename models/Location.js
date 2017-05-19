const mongoose = require('mongoose')
const Schema = mongoose.Schema

const locationSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  latitude: {
    type: String
  },
  longitude: {
    type: String
  }
})

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
