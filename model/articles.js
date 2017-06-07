const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
  title: String,
  link: String,
  comment: []
});

module.exports = mongoose.model('article', ArticleSchema);
