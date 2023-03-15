const express = require('express');
const { Occasion } = require('../models');
const auth = require('../utils/auth')
const router = express.Router();

router.get('/:id', auth, async(req, res) => {

    const occasionData = await Occasion.findOne({ include: { all: true, nested: true }, where: {id:req.params.id}})
    if (!occasionData) return res.status(400).redirect('/')

    const plainOccasionData = occasionData.get({plain: true})
    
    if (req.session.user.id != plainOccasionData.user.id) return res.redirect('/')

    res.render('newrecipient', {id: req.params.id, user: req.session.user, loggedIn: req.session.loggedIn});
});


module.exports = router;