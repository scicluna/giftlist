const router = require('express').Router();
const {User} = require('../../models')

router.post('/login', async (req, res) => {
    const {username, password} = req.body

    const userData = await User.findOne({where: {name:username}})
    if(!userData) return res.status(400).json("Not a valid username")

    const validPassword = await userData.checkPassword(password)
    if (!validPassword) return res.status(400).json({msg: "Not a valid login or password"})

    const plainUser = userData.get({plain: true})

    req.session.save((err)=>{
        req.session.loggedIn = true
        req.session.user = plainUser
        res.status(200).json({ user: userData, message: 'You are now logged in!' })
    })
})

router.post('/signup', async(req, res) => {
    const {name, password, email} = req.body

    const userData = await User.create({name, password, email})
    if(!userData) return res.status(400).json("Not a valid configuration")

    const plainUser = userData.get({plain: true})
    req.session.save((err)=>{
        req.session.loggedIn = true
        req.session.user = plainUser
        res.status(200).json({ user: userData, message: 'You are now logged in!' })
    })
})

router.post('/logout', (req,res) => {
    if (req.session.loggedIn) {req.session.destroy(()=>{
        res.status(204).end()
    })} else res.status(404).end()
})
module.exports = router