const mongoose = require('mongoose');
const { urlPattern } = require('../utils/constants');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return urlPattern.test(v);
        },
        message: 'Некорректный URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    likes: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      }],
      default: [],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
