import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize.client.js';

class Game extends Model {}

Game.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,modelName: 'Game',
  });

export default Game;