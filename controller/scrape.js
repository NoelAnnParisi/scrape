const router = require('express').Router();

const cheerio = require('cheerio');
const request = require("request");

const Article = require('../model/articles');

const scrapeNews = (req, res) => {
  request("https://www.nytimes.com/", (error, response, html) => {
    const $ = cheerio.load(html);
    const templateData = [];
    $("h2.story-heading").each(function(i, element) {

      const title = $(this).text();
      const link = $(element).children().attr("href");

      if (title !== '' && link && title.charAt(0) !== "\n" && title !==
        "Mortgage Calculator" && title !== "Search for Homes for Sale or Rent") {
        templateData.push({
          title: title,
          link: link
        });
      }
    });

    Article.create(templateData, (err, doc) => {
      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          Article.find({}, (err, result) => {
            const handlebars = {
              result: result
            }

            console.log(`The error code block is running`);
            console.log(`hbs: ${JSON.stringify(handlebars, null, 2)}`);
            res.render('storedArticles', handlebars);
          })
        }
      } else {
        const handlebars = {
          result: doc
        }
        res.render('index.handlebars', handlebars);
      }
    });
  })
}

module.exports = {
  scrapeNews
}
