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
        "Mortgage Calculator" && title !== "Search for Homes for Sale or Rent" &&
        !title.includes("Morning Briefing") && title !== "What to Cook This Week"
        && !title.includes("Homes That Sold for Around")) {
        templateData.push({
          title: title,
          link: link
        });
      }
    });
    // console.log("scrape block: ", typeof templateData);
    // const view = [];

    // using scraped data, create an instance of Mongoose schema
    Article.create(templateData, (err, doc) => {
      if (err) {
        console.log(err);
        // if title/link already exsists query today's news from the database
        if (err.name === 'MongoError' && err.code === 11000) {
          Article.find({}).sort({'created_at': -1}).limit(9).exec((err, result) => {
            const handlebars = {
              result: result
            }
            res.render('storedArticles', handlebars);
          })
        }
      // else create instance & render results
      } else {
        console.log('else is running');
        Article.create(templateData, (err, doc) => {
          Article.find({}, (err, result) => {
            console.log(`${JSON.stringify(result, null,2)}`);
            const handlebars = {
              result: result
            }
            res.render('index.handlebars', handlebars);
          })
        });
      };
    });
  });
}
module.exports = {
  scrapeNews
}
