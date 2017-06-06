const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const article = new Schema({
  title: String,
  link: String,
  comment: [{
    body: String,
    date: Date
  }]
}, {
  collection: 'scrapedData'
});

const ScrapedData = mongoose.model('scrapedData', article);

module.exports = ScrapedData;
