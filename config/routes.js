const express = require('express');
const router = express.Router();
const usersRouter = express.Router();
const remindersRouter = express.Router();

const usersController = require('../controllers/users');
const remindersController = require('../controllers/reminders');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Welcome to GeoReminder!'
  });
});

remindersRouter.route('/:userId')
  .post(remindersController.createReminder)

remindersRouter.route('/:userId/:reminderId')
  .get(remindersController.getReminder)
  .put(remindersController.updateReminder)
  .delete(remindersController.deleteReminder)

usersRouter.route('/')
  .post(usersController.create)

usersRouter.route('/:id')
  .get(usersController.me)

usersRouter.route('/')

module.exports = {
  reminders: remindersRouter,
  users: usersRouter,
  other: router
}
