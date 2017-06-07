const Article = require('../model/articles');

const viewAllNews = (req, res) => {
  Article.find({}, (err, result) => {
    const handlebars = {
      result: result
    }
    res.render('viewArchives.handlebars', handlebars);
  })
}

module.exports = {viewAllNews}
