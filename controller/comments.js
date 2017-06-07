// const router = require('express').Router();
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const Article = require('../model/articles');

const renderComments = (req, res) => {
  Article.find({}, (err, result) => {
    const handlebars = {
      result: result
    }
    console.log(`handlebars for comment: ${JSON.stringify(handlebars, null, 2)}`)
    res.render('storedArticles.handlebars', handlebars);
  })
}

const insertComment = (req, res) => {
  const id = req.body.dbID;
  const where = {_id: id};
  // fix how it pushes to the comment array!
  const query = Article.findByIdAndUpdate(where,
    {$push:{'comment': req.body.comment}});
  // const promise = query.exec();
  query.then(()=> {
    renderComments(req, res)
  });
}

module.exports = {
  insertComment
}
