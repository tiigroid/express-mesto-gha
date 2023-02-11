const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Исследователь океана',
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator(v) {
          return /^https?:\/\/(www\.)?[a-z0-9@:%._+~#=-]+\.[a-z]+\/?(?:[a-z0-9-._~:/?#[\]@!$&'()*+,;=-]*)$/i.test(v);
        },
        message: 'Некорректный URL',
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(v) {
          return validator.isEmail(v);
        },
        message: 'Некорректный email',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
