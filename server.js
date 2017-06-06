const express = require('express');
const exphbs = require("express-handlebars");
const body = require('body-parser');
const path = require('path');
const port = 3000;
const app = express();
const mongoose = require('mongoose');
const routes = require('./routing/routes.js');

app.use(body.urlencoded({
  extended: false
}));

app.engine("handlebars", exphbs({
  defaultLayout: "main",
  layoutsDir: __dirname + "/views/layouts/"
}));
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'handlebars');
app.use(body.json());
app.use(body.text());
app.use(routes);
app.use((req,res,next)=> {
  res.status(404).render('404');
});
app.listen(port, () => {
  console.log("App running on port 3000!");
});
