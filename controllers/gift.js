const express = require('express');
const auth = require('../utils/auth')
const router = express.Router();

router.get('/:id', auth, async(req, res) => {
    res.render('newgift', {id: req.params.id, user: req.session.user, loggedIn: req.session.loggedIn});
});


module.exports = router;