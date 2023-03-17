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


// const occasionList = [{
//     id: '1',
//     occasion_name: "Mary's Birthday Party",
//     occasion_date: "2023-01-01",
//     recipients: [{
//         id: '1',
//         recipient_name: 'Mary',
//         gifts: [{
//             id:'1',
//             gift_name: 'necklace'
//         }]
//     }]
// },
// {
//     id: '2',
//     occasion_name: "Christmas",
//     occasion_date: "2023-12-25",
//     recipients: [{
//         id: '2',
//         recipient_name: 'Bob',
//         gifts: [{
//             id: '2',
//             gift_name: 'socks'
//         },
//         {
//             id: '3',
//             gift_name: 'book'
//         }]
//     },
//     {
//         id: '3',
//         recipient_name: 'Bill',
//         gifts: [{
//             id:'4',
//             gift_name: 'trainset'
//         },
//         {
//             id: '5',
//             gift_name: 'money'
//         }]
//     }]
// }]
