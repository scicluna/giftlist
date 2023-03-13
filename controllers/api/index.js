const router = require('express').Router();
const user = require('./userRoutes')
const gift = require('./giftRoutes')
const occasion = require('./occasionRoutes')
const recipient = require('./recipientRoutes')

router.use('/user', user)
router.use('/occasion', occasion)
router.use('/recipient', recipient)
router.use('/gift', gift)

module.exports = router;
