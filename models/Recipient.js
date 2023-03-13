const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipient extends Model {}

Recipient.init (
 {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name :{
        type: DataTypes.STRING,
        allowNull: false,
      },
      occasion_id:{
        type: DataTypes.INTEGER,
        references: {
          model: 'occasion',
          key: 'id',
      },
      }
 },
 {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'recipient',
 }
);

module.exports = Recipient;