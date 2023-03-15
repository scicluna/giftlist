const express = require('express');
const { Recipient } = require('../models');
const auth = require('../utils/auth')
const router = express.Router();

router.get('/:id', auth, async(req, res) => {

    const recipientData = await Recipient.findOne({ include: { all: true, nested: true }, where: {id:req.params.id}})
    if (!recipientData) return res.status(400).redirect('/')
    
    const plainRecipientData = recipientData.get({plain: true})

    if (req.session.user.id != plainRecipientData.occasion.user.id) return res.redirect('/')

    res.render('newgift', {id: req.params.id, user: req.session.user, loggedIn: req.session.loggedIn});
});


module.exports = router;