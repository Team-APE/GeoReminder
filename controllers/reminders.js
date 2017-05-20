const Reminder = require('../models/Reminder');
const User = require('../models/User');
const Location = require('../models/Location')
const openGeocoder = require('node-open-geocoder')
const mongoose = require('mongoose')

function getReminder(req, res, next) {
  Reminder.findById({
    _id: req.params.reminderId
  }, function(err, reminder) {
    if (err) return console.log(err)
    res.json(reminder)
  })
}

function createReminder(req, res, next) {
  console.log("REQUEST BODY", req.body)
  let reminderData = {
    title: req.body.title,
    notes: req.body.notes,
    location: {
      address: req.body.location.address
    }
  }

  openGeocoder()
    .geocode(req.body.location.address)
    .end((err, data) => {
      if (err) return console.log(err)
      reminderData.location.latitude = data[0].lat
      reminderData.location.longitude = data[0].lon
      Reminder.create(reminderData, function(err, reminder) {
        // reminder._id = mongoose.Types.ObjectId()
        // reminder.isNew = true;
        if (err) return console.log(err)
        User.findById(req.params.userId, function(err, user) {
          user.reminders.push(reminder._id)
          user.save((err, user) => {
            // User.findOne({
            //   _id: user._id
            // })
            //   .populate('reminders')
            //   .exec((err, user) => {
            //     console.log("USER SENDING BACK", user)
            //     res.json(user)
            //   })
            res.json(reminder)
          })
        })
      })
    })
}
//TODO: Use findOneAndUpdate with promise
function updateReminder(req, res, next) {
  Reminder.findById(req.params.reminderId, function(err, reminder) {
    reminder.title = req.body.title;
    reminder.notes = req.body.notes;
    reminder.location.address = req.body.location.address
    openGeocoder()
      .geocode(req.body.location.address)
      .end((err, data) => {
        reminder.location.latitude = data[0].lat
        reminder.location.longitude = data[0].lon
        reminder.save(function(err, reminder) {
          if (err) return console.log(err)
          res.json(reminder)
        })
      })
  })
}

function deleteReminder(req, res, next) {
  User.findById(req.params.userId, function(err, user) {
    for (let i = 0; i < user.reminders.length; i++) {
      if (req.params.reminderId === user.reminders[i].toString()) {
        user.reminders.splice(i, 1)
      }
    }
    user.save({
      new: true,
      safe: true
    }, function(err, user) {
      if (err) return console.log(err)
    })
  })
  Reminder.findByIdAndRemove(req.params.reminderId, function(err) {
    if (err) return console.log(err)
    else {
      res.json({
        message: 'Reminder successfully deleted!'
      })
    }
  })
}


module.exports = {
  getReminder: getReminder,
  createReminder: createReminder,
  updateReminder: updateReminder,
  deleteReminder: deleteReminder
}
