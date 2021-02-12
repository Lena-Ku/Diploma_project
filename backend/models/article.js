const mongoose = require('mongoose');
const { isURL } = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: [isURL, 'invalid url'],
  },
  image: {
    type: String,
    required: true,
    validate: [isURL, 'invalid url'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    select: false,
  },
},
{ versionKey: false });

const articleModel = mongoose.model('article', articleSchema);

module.exports = articleModel;
