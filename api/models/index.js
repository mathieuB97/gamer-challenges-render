import User from './user.model.js';
import Role from './role.model.js';
import Challenge from './challenge.model.js';
import Game from './game.model.js';
import Contribution from './contribution.model.js';

// ==============
// Association 1 - N (One To Many)
// ==============

/* User — Role */
User.belongsTo(Role, {
  foreignKey: 'role_id',
  as: 'role',
});

Role.hasMany(User, {
  foreignKey: 'role_id',
  as: 'users',
});

/* User — Challenge (Le créateur du challenge) */
Challenge.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'creator',
});

User.hasMany(Challenge, {
  foreignKey: 'user_id',
  as: 'created_challenges',
});

/* User — Contribution (L'auteur de la vidéo) */
Contribution.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'creator',
});

User.hasMany(Contribution, {
  foreignKey: 'user_id',
  as: 'contributions',
});

/* Contribution — Challenge (La vidéo liée à un défi) */
Contribution.belongsTo(Challenge, {
  foreignKey: 'challenge_id',
  as: 'challenge',
});

Challenge.hasMany(Contribution, {
  foreignKey: 'challenge_id',
  as: 'contributions',
});

/* Challenge — Game (Le jeu auquel appartient le défi) */
Challenge.belongsTo(Game, {
  foreignKey: 'game_id',
  as: 'game',
});

Game.hasMany(Challenge, {
  foreignKey: 'game_id',
  as: 'challenges',
});

// ==============
// Association N - N (Many To Many)
// ==============

/* USER — CHALLENGE (Les participants aux challenges) */
User.belongsToMany(Challenge, {
  through: 'user_challenge',
  foreignKey: 'user_id',
  otherKey: 'challenge_id',
  as: 'participated_challenges',
});

Challenge.belongsToMany(User, {
  through: 'user_challenge',
  foreignKey: 'challenge_id',
  otherKey: 'user_id',
  as: 'participants',
});

/* USER — CONTRIBUTION (Si plusieurs personnes collaborent sur une vidéo) */
User.belongsToMany(Contribution, {
  through: 'user_contribution',
  foreignKey: 'user_id',
  otherKey: 'contribution_id',
  as: 'collab_contributions',
});

Contribution.belongsToMany(User, {
  through: 'user_contribution',
  foreignKey: 'contribution_id',
  otherKey: 'user_id',
  as: 'contributors',
});

/* EXPORT */
export { User, Role, Challenge, Game, Contribution };