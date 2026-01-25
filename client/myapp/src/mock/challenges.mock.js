// Fallback mock pour une liste de challenges
// Strict mock conforme au modèle Sequelize Challenge
export const mockChallenges = [
  {
    id: 1,
    name: "Victoire sans bouclier",
    description:
      "Remportez une partie complète sans jamais équiper de bouclier corporel. Vous devez compter uniquement sur vos compétences de tir et votre positionnement stratégique.",
    rules:
      "Aucun bouclier ne doit être équipé durant toute la partie. Vous devez faire partie de l'équipe gagnante. Les objets de soin sont autorisés. Minimum 5 éliminations requises.",
    level: "hard", // 'easy', 'medium' ou 'hard'
    time_limit_minutes: null, // Optionnel
    author: null, // à compléter si besoin
    difficulty: null,
    rating: null,
  },
  {
    id: 2,
    name: "Top 1 au pistolet",
    description:
      "Remportez une partie en utilisant uniquement le pistolet comme arme principale.",
    rules:
      "Seul le pistolet est autorisé pour infliger des dégâts. Les soins sont autorisés. Vous devez finir premier.",
    level: "medium",
    time_limit_minutes: null,
    author: null,
    difficulty: null,
    rating: null,
  },
  {
    id: 3,
    name: "0 dégâts subis",
    description:
      "Gagnez une partie sans subir le moindre dégât de la part des adversaires.",
    rules:
      "Aucun dégât reçu pendant toute la partie. Les soins sont autorisés. Vous devez finir premier.",
    level: "hard",
    time_limit_minutes: null,
    author: null,
    difficulty: null,
    rating: null,
  },
  {
    id: 4,
    name: "Win en solo",
    description:
      "Remportez une partie en mode solo contre des équipes complètes.",
    rules:
      "Vous devez jouer seul contre des équipes et finir premier. Les soins sont autorisés.",
    level: "hard",
    time_limit_minutes: null,
    author: null,
    difficulty: null,
    rating: null,
  },
];
