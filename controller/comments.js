const Article = require('../model/articles');

// query for all articles
const renderArticles = (req, res) => {
  Article.find({}, (err, result) => {
    const handlebars = {
      result: result
    }
    res.render('storedArticles.handlebars', handlebars);
  })
}

// logic when user clicks on 'Archived News'
const viewAllNews = (req, res) => {
  renderArticles(req, res);
}

// pushes user's comment to cooresponding news article
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
