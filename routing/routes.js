const router = require('express').Router();
const { scrapeNews } = require('../controller/scrape');
const { insertComment, viewAllNews } = require('../controller/comments');

router.get('/', scrapeNews);
router.get('/archives', viewAllNews);
router.post('/view', insertComment);

module.exports = router;
