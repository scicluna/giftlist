const router = require('express').Router();
const homePage = require('./home')
const api = require('./api')
const login = require('./login')
const signup = require('./signup')
const newoccasion = require('./occasion')
const newrecipient = require('./recipient')
const newgift = require('./gift')

router.use('/', homePage)
router.use('/api', api)
router.use('/login', login)
router.use('/signup', signup)
router.use('/occasion', newoccasion)
router.use('/recipient', newrecipient)
router.use('/gift', newgift)

module.exports = router;
