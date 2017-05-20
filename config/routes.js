const express = require('express');
const router = express.Router();
const usersRouter = express.Router();
const remindersRouter = express.Router();
const authRouter = express.Router();

const usersController = require('../controllers/users');
const remindersController = require('../controllers/reminders');
const cookieController = require('../controllers/cookies');
const sessionController = require('../controllers/sessions');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Welcome to GeoReminder!'
  });
});

authRouter.route('/login')
  .post(usersController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession)

authRouter.route('/logout')
  .delete(sessionController.endSession)

remindersRouter.route('/:userId')
  .post(sessionController.isLoggedIn, remindersController.createReminder)

remindersRouter.route('/:userId/:reminderId')
  .get(sessionController.isLoggedIn, remindersController.getReminder)
  .put(sessionController.isLoggedIn, remindersController.updateReminder)
  .delete(sessionController.isLoggedIn, remindersController.deleteReminder)

//creates new user
usersRouter.route('/')
  .post(usersController.create)

//shows reminders of user
usersRouter.route('/:id')
  .get(usersController.me)

// usersRouter.route('/')

module.exports = {
  auth: authRouter,
  reminders: remindersRouter,
  users: usersRouter,
  other: router
}
