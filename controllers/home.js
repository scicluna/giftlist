const { Occasion } = require('../models');

const router = require('express').Router();

router.get('/', async(req, res) => {

    if (req.session.user){
        const occasionList = await Occasion.findAll({ include: { all: true, nested: true }, where: {user_id: req.session.user.id}, order: ['date']})
        const plainOccasionList = occasionList.map(occasion=>occasion.get({plain:true}))
        res.render('homepage', {plainOccasionList , loggedIn: req.session.loggedIn, user: req.session.user})
    } else res.render('homepage')
})

module.exports = router