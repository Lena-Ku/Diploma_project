const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
const InvalidGeg = require('../utils/InvalidReg');
const {
  EMAIL_OR_PASSWORD_INCORRECT,
} = require('../utils/errorMessages');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'invalid email'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
},
{ versionKey: false });

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new InvalidGeg(EMAIL_OR_PASSWORD_INCORRECT));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new InvalidGeg(EMAIL_OR_PASSWORD_INCORRECT));
          }

          return user;
        });
    });
};

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
