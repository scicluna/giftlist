const express = require('express');
const auth = require('../utils/auth')
const router = express.Router();

router.get('/', auth, async(req, res) => {
    res.render('newoccasion', {user: req.session.user, loggedIn: req.session.loggedIn});
});


module.exports = router;