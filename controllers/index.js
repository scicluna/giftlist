const router = require('express').Router();
const homePage = require('./home')
const api = require('./api')
const login = require('./login')
const signup = require('./signup')

router.use('/', homePage)
router.use('/api', api)
router.use('/login', login)
router.use('/signup', signup)

module.exports = router;
