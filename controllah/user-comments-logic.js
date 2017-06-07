const router = require('express').Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Article = require('../mongoDB/mongoose');

const renderComments = (req, res) => {
  Article.find({}, (err, data) => {
    const handlebars = {
      data: data
    }
    console.log(`handlebars is ${JSON.stringify(handlebars, null, 2)}`);
    res.render('index.handlebars', handlebars);
  })
}

const insertComment = (req, res) => {
  console.log(req.body);
  const id = req.body.dbID;
  console.log(`YOUR ID ${id}`);
  console.log(typeof id);
  const query = {_id: id};
  // fix how it pushes to the comment array!
  Article.findByIdAndUpdate(query, {$push:{'comment': {'body': req.body.comment}}}, (err, data) => {
    if (err){
      throw new Error(err)
    }
    console.log(`this worked!`);
    console.log(data);
  })
}

module.exports = {
  insertComment
}
