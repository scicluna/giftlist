const router = require('express').Router();
const {Gift, Recipient} = require('../../models')

router.post('/:id', async(req, res) => {
    try{
    const {name} = req.body
    const id = req.params.id

    const giftData = await Gift.create({name, recipient_id: id})

    //probably redirect it to whereverthey were editting
    res.status(200).redirect('/')
    } catch(err) {
        console.log(err)
        res.status(500).json({err})
    }
})

router.put('/:id', async(req, res) => {
    try {
        //if we want it to change fields other than name aswell, we will need to add that into the logic. 
        //I suspect we will have to grab it from wherever we are going to be doing fetch requests to the api.
        const {name} = req.body
        const id = req.params.id

        const giftData = await Gift.update({name}, {where:{id}})
        if (!giftData) return res.status(400).json("Gift not changed")
        res.status(200).json("Gift Changed")
    } catch(err){res.status(500).json(err)}
})

router.delete('/:id', async(req, res)=>{
    try{
        const id = req.params.id
        const giftData = await Gift.destroy({where: {id}})
        if (!giftData) return res.status(400).json("Gift not destroyed")
        res.status(200).json("Destroyed")
    } catch(err){res.status(500).json(err)}
})

module.exports = router