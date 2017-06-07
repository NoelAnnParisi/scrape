const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
  title: {type:String, unique: true},
  link: {type:String, unique: true},
  comment: []
});

module.exports = mongoose.model('article', ArticleSchema);
