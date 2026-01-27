import api from '../api.js';

// Récupère le nombre total de votes pour un challenge
export async function getChallengeVoteCount(challengeId) {
  return api(`/votes/challenge/${challengeId}`);
}

// Récupère les top challenges par nombre de votes
export async function getTopChallenges() {
  return api(`/votes/top-challenges`);
}
