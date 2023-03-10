//MODELS
const User = require('./User');
const Gift = require('./Gift')
const Occasion = require('./Occasion');
const Recipient = require('./Recipient');

//ASSOCIATIONS
User.hasMany(Occasion, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Occasion.belongsTo(User, {
    foreignKey: 'user_id'
});

Recipient.hasMany(Gift, {
    foreignKey: 'recipient_id',
    onDelete: 'CASCADE'
});

Gift.belongsTo(Recipient, {
    foreignKey: 'recipient_id'
});


Occasion.hasMany(Recipient, {
    foreignKey: 'occasion_id',
    onDelete: 'CASCADE'
});


Recipient.belongsTo(Occasion, {
    foreignKey: 'occasion_id'
});

module.exports = { User, Recipient, Occasion, Gift };

