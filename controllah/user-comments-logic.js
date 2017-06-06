const router = require('express').Router();

const mongojs = require('mongojs');
const databaseURL = 'scraping';
const collections = ['scrapedData'];
const db = mongojs(databaseURL, collections);
const ScrapedData = require('../mongoDB/mongoose');

db.on('connect', () => {
  console.log('database connected');
});
db.on("error", (error) => {
  console.log("Database Error:", error);
});

const renderComments = (req, res) => {
  scrapedData.find({}, (err, data) => {
    const handlebars = {
      data: data
    }
    console.log(`handlebars is ${JSON.stringify(handlebars, null, 2)}`);
    res.render('index.handlebars', handlebars);
  })
}
// fix this part!
const insertComment = (req, res) => {
  const userComment = req.body;
  console.log(req.body);
  const comment = {
    comment: toString(userComment[Object.keys(userComment)])
  }
  scrapedData.save(comment), (err, data) => {
    if (err) {
      return console.log(err);
    } else {
      renderComments(req, res);
    }
  }
}

module.exports = {
  insertComment
}
