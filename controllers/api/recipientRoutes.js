const router = require('express').Router();
const {Recipient} = require('../../models')

router.post('/:id', async(req, res) => {
    try{
    const {name} = req.body
    const occasion_id = req.params.id

    const postRecipient = await Recipient.create({name, occasion_id })
    if (!postRecipient) return res.status(400).json("Recipient failed")

    res.status(200).json("Recipient added")
    } catch (err){res.status(500).json(err)}
})

router.put('/:id', async(req, res)=>{
    try{
        const {name} = req.body
        const id = req.params.id

        const editRecipient = await Recipient.update({name}, {where:{id}})
        if (!editRecipient) return res.status(400).json("Recipient not edited")
        res.status(200).json("Edited")
    }
    catch(err){res.status(500).json(err)}
})

router.delete('/:id', async(req, res)=>{
    try{
        const id = req.params.id
        const deleteRecipient = await Recipient.destroy({where: {id}})
        if (!deleteRecipient) return res.status(400).json("Not destroyed")
        res.status(200).json("Destroyed")
    }
    catch(err){res.status(500).json(err)}
})
module.exports = router