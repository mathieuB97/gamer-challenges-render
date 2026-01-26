import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize.client.js';

class Challenge extends Model {}

Challenge.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    rules: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    level: {
      type: DataTypes.ENUM('easy', 'medium', 'hard'),
      allowNull: false,
    },

    time_limit_minutes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

  },
  {
    sequelize,modelName: 'Challenge'}
);

export default Challenge;