const router = require('express').Router();
const { scrapeNews, viewOldNews } = require('../controllah/business-logic');
const { insertComment, renderComments } = require('../controllah/user-comments-logic');

router.get('/', scrapeNews);
router.get('/all', viewOldNews);
router.post('/', insertComment);

module.exports = router;
