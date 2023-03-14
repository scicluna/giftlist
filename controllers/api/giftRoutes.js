const router = require('express').Router();
const {Gift, Recipient} = require('../../models')

router.post('/', async(req, res) => {
    try{
    const {name, recipientName} = req.body

    //Probably going to be a massive amount of logic here depending on what rainforest can get us. But the skeleton remains true.
    //recipient might be hard to smuggle out - if its just an ID we can raw plug it in, or else we need to process it like below.
    const recipientData = await Recipient.findOne({where: {name:recipientName}})
    const plainRecipientData = recipientData.get({plain:true})

    const giftData = await Gift.create({name, id:plainRecipientData.id})

    //probably redirect it to whereverthey were editting
    res.status(200).redirect('/')
    } catch(err) {
        console.log(err)
        res.status(500).json({err})
    }
})

router.put('/', async(req, res) => {
    try {
        //if we want it to change fields other than name aswell, we will need to add that into the logic. 
        //I suspect we will have to grab it from wherever we are going to be doing fetch requests to the api.
        const {name, id} = req.body

        const giftData = await Gift.update({name}, {where:{id}})
        if (!giftData) return res.status(400).json("Gift not changed")
        res.status(200).json("Gift Changed")
    } catch(err){res.status(500).json(err)}
})

router.delete('/', async(req, res)=>{
    try{
        const {id} = req.body
        const giftData = await Gift.destroy({where: {id}})
        if (!giftData) return res.status(400).json("Gift not destroyed")
        res.status(200).json("Destroyed")
    } catch(err){res.status(500).json(err)}
})

module.exports = router