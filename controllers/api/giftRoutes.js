const router = require('express').Router();
const {Gift, Recipient} = require('../../models')

router.post('/:id', async(req, res) => {
    try{
    const {name, price, img1, img2, img3,img4, img5, img6, link1, link2, link3, link4, link5, link6} = req.body
    
    const id = req.params.id

    const giftData = await Gift.create({name, recipient_id: id,  price, img1, img2, img3,img4, img5, img6, link1, link2, link3, link4, link5, link6})

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
        const {name, price, img1, img2, img3,img4, img5, img6, link1, link2, link3, link4, link5, link6} = req.body
        const id = req.params.id

        const giftData = await Gift.update({name, recipient_id: id,  price, img1, img2, img3,img4, img5, img6, link1, link2, link3, link4, link5, link6}, {where:{id}})
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