const router = require('express').Router();
const {Gift, Recipient} = require('../../models')

router.post('/', async(req, res) => {
    try{
    const {name, recipientName} = req.body

    //recipient might be hard to smuggle out - if its just an ID we can raw plug it in, or else we need to process it like below
    const recipientData = await Recipient.findOne({where: {name:recipientName}})
    const plainRecipientData = recipientData.get({plain:true})

    const giftData = await Gift.create({name, id:plainRecipientData.id})

    //probably redirect it to whereverthey were editting
    res.redirect('/')
    }
    catch(err) {
        console.log(err)
        res.status(500).json({err})
    }
})

router.put('/', async(req, res) => {
    try {
        
    } catch (error) {
        
    }
})



module.exports = router