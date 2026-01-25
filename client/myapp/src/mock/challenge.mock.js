
// Mutualisation : on importe le mockChallenges du fichier challenges.mock.js
import { mockChallenges } from "./challenges.mock.js";
// Le fallback challenge unique est le premier de la liste
export const mockChallenge = mockChallenges[0];

// Fallback mock pour le leaderboard
export const mockBestChallenges = [
  {
    id: 101,
    user: "ShadowGamer",
    level: "7K",
    points: "1523D",
    time: "18:32",
    rating: 4.8,
    votes: "156v",
  },
  {
    id: 102,
    user: "ProElite99",
    level: "6K",
    points: "1445D",
    time: "19:45",
    rating: 4.6,
    votes: "142v",
  },
  {
    id: 103,
    user: "NightHawk",
    level: "5K",
    points: "1389D",
    time: "20:12",
    rating: 4.5,
    votes: "128v",
  },
  {
    id: 104,
    user: "ThunderStrike",
    level: "5K",
    points: "1256D",
    time: "21:03",
    rating: 4.3,
    votes: "98v",
  },
  {
    id: 105,
    user: "MysticWarrior",
    level: "6K",
    points: "1198D",
    time: "22:18",
    rating: 4.2,
    votes: "87v",
  },
];
