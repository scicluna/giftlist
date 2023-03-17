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
         img4: {
            type: DataTypes.STRING,
         },
         img5: {
            type: DataTypes.STRING,
         },
         img6: {
            type: DataTypes.STRING,
         },
         link1: {
            type: DataTypes.TEXT,
         },
         link2: {
            type: DataTypes.TEXT,
         },
         link3: {
            type: DataTypes.TEXT,
         },
         link4: {
            type: DataTypes.TEXT,
         },
         link5: {
            type: DataTypes.TEXT,
         },
         link6: {
            type: DataTypes.TEXT,
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