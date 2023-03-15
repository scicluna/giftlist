const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  if (req.session.loggedIn) return res.redirect('/')
    res.render('signup');
  });

  module.exports = router;