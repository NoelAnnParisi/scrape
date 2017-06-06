const express = require('express');
const exphbs = require("express-handlebars");
const body = require('body-parser');
const path = require('path');
const cheerio = require('cheerio');
const request = require("request");
const port = 3000;
const app = express();

const mongojs = require('mongojs');
const databaseURL = 'scraping';
const collections = ['scrapedData'];
const db = mongojs(databaseURL, collections);

app.use(body.urlencoded({
  extended: false
}));

app.engine("handlebars", exphbs({
  defaultLayout: "main",
  layoutsDir: __dirname + "/views/layouts/"
}));
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'handlebars');

db.on("error", function(error) {
  console.log("Database Error:", error);
});

app.get("/", function(req, res) {
  res.render('index.handlebars');
});
// has data
app.get("/scrapedData", (req, res) => {
  db.scrapedData.find({}, (err, data) => {
    // Log any errors if the server encounters one
    if (err) {
      return console.log(err);
    } else {
      res.json(data);
    }
  });
});

// not data
app.get("/scraping", (req, res) => {
  db.scraping.find({}, (err, data) => {
    // Log any errors if the server encounters one
    if (err) {
      return console.log(err);
    } else {
      res.json(data);
    }
  });
});

app.get('/scrape', (req, res) => {
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
    db.scrapedData.insert(result);
    res.json(result);
  });
});

app.listen(port, function() {
  console.log("App running on port 3000!");
});
