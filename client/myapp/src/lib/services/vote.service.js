import api from '../api.js';

// Récupère le nombre total de votes pour un challenge
export async function getChallengeVoteCount(challengeId) {
  return api(`/votes/challenge/${challengeId}`);
}
