//import dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Occasion extends Model {}

Occasion.init (
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
         date: {
            type: DataTypes.DATE,
            allowNull: false,
         },
         location: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
         },
         

    },
    {
       sequelize,
       timestamps: false,
       freezeTableName: true,
       underscored: true,
       modelName: 'occasion',
    }
   );
   
   module.exports = Occasion;