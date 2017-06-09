const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
  title: {type:String, unique: true},
  link: {type:String, unique: true},
  comment: [],
}, {
  timestamps: {
    createdAt: 'created_at',
    default: Date.now
  }
});

mongoose.connection.on('error', () => {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});

module.exports = mongoose.model('article', ArticleSchema);
