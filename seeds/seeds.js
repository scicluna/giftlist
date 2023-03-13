const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedOccasions();
  console.log('\n----- OCCASIONS SEEDED -----\n');

  await seedRecipients();
  console.log('\n----- RECIPIENTS SEEDED -----\n');

  await seedGifts();
  console.log('\n----- GIFTS SEEDED -----\n');

  process.exit(0);
};
seedAll();
///////////////////////////////////////////////////////////////////////
const { User } = require('../models');
const userData = [
    {

        name: 'coolman',
        email: 'a@a.com',
        password: '12345678'
    }
  ];
const seedUsers = () => User.bulkCreate(userData);
///////////////////////////////////////////////////////////////////////
const { Occasion } = require('../models')
const occasionData = [
    {
        name: "Bill's Birthday",
        date: '2023-08-01',
        location: "Bill's House",
        user_id: 1
    },
    {
        name: "Valentine's Day",
        date: '2023-02-14',
        location: "Mario Italiano",
        user_id: 1
    }
]
const seedOccasions = () => Occasion.bulkCreate(occasionData)
///////////////////////////////////////////////////////////////////////
const { Recipient } = require('../models')
const recipientData = [
    {
        name: "Bill",
        occasion_id: 1
    },
    {
        name: "Mary",
        occasion_id: 2
    }
]
const seedRecipients = () => Recipient.bulkCreate(recipientData)
///////////////////////////////////////////////////////////////////////
const { Gift } = require('../models')
const giftData = [
    {
        name: 'watch',
        recipient_id: 1
    },
    {
        name: 'gift card',
        recipient_id: 1
    },
    {
        name: 'shoes',
        recipient_id: 2
    },
    {
        name: 'roses',
        recipient_id: 2
    },
    {
        name: 'chocolate',
        recipient_id: 2
    }
]
const seedGifts = () => Gift.bulkCreate(giftData)
