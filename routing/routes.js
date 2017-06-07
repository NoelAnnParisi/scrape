const router = require('express').Router();
const { scrapeNews, viewOldNews } = require('../controllah/business-logic');
const { insertComment } = require('../controllah/user-comments-logic');

router.get('/', scrapeNews);
router.post('/', insertComment);

module.exports = router;
