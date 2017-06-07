const router = require('express').Router();
const { scrapeNews, viewOldNews } = require('../controller/scrape');
const { insertComment } = require('../controller/comments');
const { viewAllNews } = require('../controller/archives');


router.get('/', scrapeNews);
router.get('/archives', viewAllNews);
router.post('/view', insertComment);

module.exports = router;
