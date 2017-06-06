const router = require('express').Router();
const { scrapeNews, viewOldNews } = require('../controllah/business-logic');

router.get('/', scrapeNews);
router.get('/all', viewOldNews);

module.exports = router;
