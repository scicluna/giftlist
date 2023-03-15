const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Gift extends Model {}

Gift.init (
    {
       id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           primaryKey: true,
           autoIncrement: true,
         },
         name: {
           type: DataTypes.STRING,
           allowNull: false,
         },
         recipient_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'recipient',
                key: 'id',
            }
         },
         price: {
            type: DataTypes.DECIMAL,
         },
         img1: {
            type: DataTypes.STRING,
         },
         img2: {
            type: DataTypes.STRING,
         },
         img3: {
            type: DataTypes.STRING,
         },
         link1: {
            type: DataTypes.STRING,
         },
         link2: {
            type: DataTypes.STRING,
         },
         link3: {
            type: DataTypes.STRING,
         },
      
    },
    {
       sequelize,
       timestamps: false,
       freezeTableName: true,
       underscored: true,
       modelName: 'gift',
    }
   );
   
   module.exports = Gift;