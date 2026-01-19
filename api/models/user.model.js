import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize.client.js';

class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
  { sequelize, modelName: 'User'},
);

export default User;