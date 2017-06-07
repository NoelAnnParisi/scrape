const Article = require('../model/articles');

const renderArticles = (req, res) => {
  Article.find({}, (err, result) => {
    const handlebars = {
      result: result
    }
    console.log(`handlebars for comment: ${JSON.stringify(handlebars, null, 2)}`)
    res.render('storedArticles.handlebars', handlebars);
  })
}

const viewAllNews = (req, res) => {
  renderArticles(req, res);
}

const insertComment = (req, res) => {
  const id = req.body.dbID;
  const where = {_id: id};
  const query = Article.findByIdAndUpdate(where,
    {$push:{'comment': req.body.comment}});
  query.then(()=> {
    renderArticles(req, res)
  });
}

module.exports = {
  insertComment,
  viewAllNews
}
