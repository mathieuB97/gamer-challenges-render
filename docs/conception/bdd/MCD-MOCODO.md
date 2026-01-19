# MCD 

> Modélisation Conceptuelle des Données - méthode Merise

Créer sur l'application [MOCODO online](https://www.mocodo.net/?mcd=eNptUUtugzAQ3fsUPgCLZpsdolZKhQx1IFtkwUBdGYwM7hmamzTn4GIdII0giSxbM6PR-_kUpyxPfJGGQZj4aRhzj75wmqVhFB79lGVi7jcbZNPtaeuavJN2UIXq5KBM69HS2fECHv1WJZjcWU0O45mPP4LNcMGbH0WMH7Db7e7A93iIiCO2AFujEac1DXllSXxkj_IeEAIxnpl4ungjJrdqoSk-pdbQ1gsXGoC-sKpb3Njxt9bQ41RVlSqcHsbLv8ccnwostAVMwv3gIwuZSGe2-xQnV2Q1XKjdoLTq5QDOehQaqfRVgywt9D0qwvwmgarFuuvBlcajjRnyEjB33CCn6RdXoT75wZXzmAdMcLYNZF56ZxnBu-j6AncVUkg0XBurYBPMH0q2s4A=) avec le langage MCD:

```MCD
VOTE_PARTICIPATION, 0N UTILISATEUR, 0N PARTICIPATION
PARTICIPATION: num_participation, durée, video_url
GÉNÈRE, 0N CHALLENGE, 11 PARTICIPATION
:
:

ROLE: num_role, nom
DEPOSE, 0N UTILISATEUR, 11 PARTICIPATION
CRÉER, 0N UTILISATEUR, 11 CHALLENGE
CHALLENGE: num_challenge, nom, description, règles, difficulté, durée_réference
:

ACQUIERT, 11 UTILISATEUR, 0N ROLE
UTILISATEUR: num_utilisateur, email, nom, adresse, url_chaine, pseudo, mot_de_passe
VOTE_CHALLENGE, 0N UTILISATEUR, 0N CHALLENGE
CONCERNE, 11 CHALLENGE, 0N JEU
JEU: num_jeu, nom, catégorie, description
```