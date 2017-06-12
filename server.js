const express = require('express');
const hndbrs = require('handlebars');
const exphbs = require("express-handlebars");
const helpers = require('handlebars-helpers');
const body = require('body-parser');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const mongoose = require('mongoose');
const routes = require('./routing/routes.js');
// for development
// mongoose.connect('mongodb://localhost/scraping');
// for production:
mongoose.connect('mongodb://heroku_wxk7rfvz:tu1f9v67t3ljf6p46p7kmjqdaa@ds163681.mlab.com:63681/heroku_wxk7rfvz');
app.use(body.urlencoded({
  extended: true
}));
app.use(body.json());

//initialize handlebar helper method
hndbrs.registerHelper('counter', (index) => {
    return index + 1;
});

app.engine("handlebars", exphbs({
  defaultLayout: "main",
  helpers: helpers,
  layoutsDir: __dirname + "/views/layouts/"
}));

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'handlebars');

app.use(routes);
app.use((req,res,next)=> {
  res.status(404).render('404');
});
app.listen(port, () => {
  console.log("App running on port 3000!");
});
