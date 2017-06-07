const cheerio = require('cheerio');
const request = require("request");

// import in mongoose schema
const Article = require('../model/articles');

// scrape ny times page source for headlines
const scrapeNews = (req, res) => {
  request("https://www.nytimes.com/", (error, response, html) => {
    const $ = cheerio.load(html);
    const templateData = [];
    // for each headline scrape the text and link
    $("h2.story-heading").each(function(i, element) {
      const title = $(this).text();
      const link = $(element).children().attr("href");
      // if it's a valid title & link push to array
      if (title !== '' && link && title.charAt(0) !== "\n" && title !==
        "Mortgage Calculator" && title !== "Search for Homes for Sale or Rent") {
        templateData.push({
          title: title,
          link: link
        });
      }
    });
    // using scraped data, create an instance of Mongoose schema
    Article.create(templateData, (err, doc) => {
      if (err) {
        // if title/link already exsists query and display from DB
        if (err.name === 'MongoError' && err.code === 11000) {
          Article.find({}, (err, result) => {
            const handlebars = {
              result: result
            }
            res.render('storedArticles', handlebars);
          })
        }
      // else create instance & render results
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
