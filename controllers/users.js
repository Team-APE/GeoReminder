const User = require('../models/User');

function create(req, res, next) {
  if (!req.body.password) {
    return res.status(422).send('Missing required fields');
  }
  User.create(req.body)
    .then(function(user) {
      // res.json({
      //   success: true,
      //   message: 'Successfully created user.',
      //   data: {
      //     id: user._id
      //   }
      // });

    }).catch(function(err) {
    if (err.message.match(/E11000/)) {
      err.status = 409;
    } else {
      err.status = 422;
    }
    next(err);
  });
}


function me(req, res, next) {
  User.findOne({
    _id: req.params.id
  })
    .populate('reminders')
    .exec((err, user) => {
      res.json(user)
    })
    //.exec()
    // .then(function(user) {
    //   res.json({
    //     success: true,
    //     message: 'Successfully retrieved user data.',
    //     data: user
    //   });
    //})
    .catch(function(err) {
      next(err);
    });
}

//compare hashed passwords
function verifyUser(req, res, next) {
  User.findOne({
    userName: req.body.userName
  }, function(err, user) {
    if (err || !user) {
      console.log(user)
      res.json({
        success: false
      })
    } else {
      console.log('Verifying,..', req.body.password)

      if (user.verifyPasswordSync(req.body.password)) {
              console.log('verify gj')

        req._id = user._id
        next()
      } else {
        res.json({
          success: false
        })
      }
    }
  })
}


module.exports = {
  create: create,
  me: me,
  verifyUser: verifyUser
}
