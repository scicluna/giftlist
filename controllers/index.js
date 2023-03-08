const router = require('express').Router();
const homePage = require('./home')

router.use('/', homePage)

module.exports = router;
