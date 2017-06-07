const router = require('express').Router();
const { scrapeNews, viewOldNews } = require('../controller/scrape');
const { insertComment } = require('../controller/comments');

router.get('/', scrapeNews);
router.post('/view', insertComment);

module.exports = router;
