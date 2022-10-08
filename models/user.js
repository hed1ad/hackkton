const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Unauthorized = require('../errors/Unauthorized');

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function (login, password) {
  return this.findOne({ login }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неправильные логин или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized('Неправильные логин или пароль');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
