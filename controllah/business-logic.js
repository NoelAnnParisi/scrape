// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/scraping');
// mongodb://heroku_wxk7rfvz:tu1f9v67t3ljf6p46p7kmjqdaa@ds163681.mlab.com:63681/heroku_wxk7rfvz
const router = require('express').Router();
const cheerio = require('cheerio');
const request = require("request");
const mongojs = require('mongojs');
const databaseURL = 'scraping';
const collections = ['scrapedData'];
const db = mongojs(databaseURL, collections);

db.on('connect', () => {
  console.log('database connected');
});
db.on("error", (error) => {
  console.log("Database Error:", error);
});

const scrapeNews = (req, res) => {
  request("https://www.nytimes.com/", (error, response, html) => {
    const $ = cheerio.load(html);
    const result = [];
    $("h2.story-heading").each(function(i, element) {
      const title = $(this).text();
      const link = $(element).children().attr("href");
      // fix the part where title starts with "/n" --> girl you don't want that!
      if (title !== '' && link && title.charAt(0) !== "\n") {
        result.push({
          title: title,
          link: link
        });
      }
    });
    console.log(result);
    const handlebars = {
      result: result
    }
    db.scrapedData.insert(result);
    res.render('index.handlebars', handlebars);
  });
};

const viewOldNews = (req, res) => {
  db.scrapedData.find({}, (err, data) => {
    if (err) {
      return console.log(err);
    } else {
      const handlebars = {
        data: data
      }
      res.render('viewStoredNews.handlebars', handlebars);
    }
  });
}
module.exports = {
  scrapeNews,
  viewOldNews
}
