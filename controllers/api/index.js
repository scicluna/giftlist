const router = require('express').Router();
const user = require('./userRoutes')
const gift = require('./giftRoutes')

router.use('/user', user)
router.use('/gift', gift)

module.exports = router;
