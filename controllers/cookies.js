const User = require('../models/User');
const sessionController = require('./sessions');

const cookieController = {};
cookieController.setSSIDCookie = setSSIDCookie;
cookieController.getSSIDCookie = getSSIDCookie;


function setSSIDCookie(req, res, next) {
  console.log('setting cookie!!')
  res.cookie('ssid', req._id, {
    httpOnly: true
  })
  next()

}

function getSSIDCookie(req, res, next) {

  res.cookie('ssid', req._id, {
    httpOnly: true
  })
  next()

}

module.exports = cookieController;
