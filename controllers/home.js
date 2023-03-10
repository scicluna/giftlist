const router = require('express').Router();

router.get('/', async(req, res) => {

    //grab list of occassions including their recipients and their recipients gifts

    res.render('homepage', {occasionList:'', loggedIn: req.session.loggedIn, user: req.session.user})
})

module.exports = router