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
            type: DataTypes.STRING,
            references: {
                model: 'recipient',
                key: 'id',
            }
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