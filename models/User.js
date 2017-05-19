const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  reminders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reminder'
  }]
})

// add bcrypt hashing to model (works on a password field)!
// adds password digest
userSchema.plugin(require('mongoose-bcrypt'));

userSchema.options.toJSON = {
  transform: function(document, returnedObject, options) {
    delete returnedObject.password;
    return returnedObject;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
