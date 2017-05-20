const Session = require('../models/Session');
const cookieController = require('./cookies');

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
  Session.findOne({
    cookieId: req.cookies.ssid
  }, function(err, session) {
    if (session) {
      next()
    } else {
      res.json({
        success: false,
        message: 'session expired'
      })
    }
  })

};

sessionController.startSession = (req, res, next) => {
  console.log('starting session!!')
  Session.create({
    cookieId: req._id
  }, function(err, session) {
    if (session) {
      res.json({
        success: true,
        message: 'Successfully logged in!'
      })
    } else {
      res.json({
        success: false,
        message: 'something went wrong....!'
      })
    }
  })
};

sessionController.endSession = (req, res) => {
  console.log(req.cookies.ssid)
  Session.findOneAndRemove({
    cookieId: req.cookies.ssid
  }, function(err) {
    if (err) return console.log(err)
    console.log('removed session!: ', req.cookies.ssid)
    res.json({
      success: true,
      message: 'Logged out user!'
    })
  })
}

module.exports = sessionController;
