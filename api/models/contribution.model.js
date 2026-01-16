import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize.client.js';

class Contribution extends Model {}

Contribution.init(
  {
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    video_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
  {
    sequelize,modelName: 'Contribution'
  
  }
);

export default Contribution;