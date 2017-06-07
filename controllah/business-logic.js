const router = require('express').Router();

const cheerio = require('cheerio');
const request = require("request");

const Article = require('../mongoDB/mongoose');

const scrapeNews = (req, res) => {
  request("https://www.nytimes.com/", (error, response, html) => {
    const $ = cheerio.load(html);
    const templateData = [];
    $("h2.story-heading").each(function(i, element) {

      const title = $(this).text();
      const link = $(element).children().attr("href");

      if (title !== '' && link && title.charAt(0) !== "\n") {
        templateData.push({
          title: title,
          link: link
        });
      }
    });

    Article.create(templateData, (err, doc) => {
      if (err) throw new Error(err);
      const handlebars = {
        result: doc
      }
      res.render('index.handlebars', handlebars);
    });
  })
}

module.exports = {
  scrapeNews
}
