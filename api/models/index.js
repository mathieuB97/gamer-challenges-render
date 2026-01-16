import User from './user.model.js';
import Role from './role.model.js';
import Challenge from './challenge.model.js';
import Game from './game.model.js';
import Contribution from './contribution.model.js';


/* User — Role */
User.belongsTo(Role, {
  foreignKey: 'role_id',
  as: 'role',
});

Role.hasMany(User, {
  foreignKey: 'role_id',
  as: 'users',
});


/* USER — CHALLENGE */
Challenge.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'creator',
});

User.hasMany(Challenge, {
  foreignKey: 'user_id',
  as: 'challenges',
});


/* CHALLENGE — GAME */
Game.hasMany(Challenge, {
  foreignKey: 'game_id',
  as: 'challenges',
});

Challenge.belongsTo(Game, {
  foreignKey: 'game_id',
  as: 'game',
});


/* USER — CONTRIBUTION */
Contribution.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

User.hasMany(Contribution, {
  foreignKey: 'user_id',
  as: 'contributions',
});


/* CHALLENGE — CONTRIBUTION */
Challenge.hasMany(Contribution, {
  foreignKey: 'challenge_id',
  as: 'contributions',
});

Contribution.belongsTo(Challenge, {
  foreignKey: 'challenge_id',
  as: 'challenge',
});

/* EXPORT */
export {
  User,
  Role,
  Challenge,
  Game,
  Contribution,
};
