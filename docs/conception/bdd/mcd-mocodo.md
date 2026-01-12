# MCD Gamer Challenges avec Mocodo
=======

> Diagramme généré avec [Mocodo](https://www.mocodo.net/?mcd=eNptjk1OwzAQRvc-xRwgi2bbnSFDGVTZkeNU7FAErmTU2m2wEVfiHFyMxFNB-JEly_pmvudn9BbXEPLxYYwHV0GIR6GvLKGyFawUmGleQV1Db2lLnbTYG7F4czcnf_AvQ3J5ZESruw4bLIhWGkvX1EpLWpVkyfoxZdppGJN_9Kch-RiEQTkt_4uqFTR4Q2I9HXGH_T3sqEHNlGeX3y4yRk8-TPje-mOykRuFv1P-VpOyotwXw-hDquCch5B8-ngXsrlFw-XZqKgt2XPI1Se396y10xaZP7--uiXn3deYnPgEo9V41w==)

```mcd
ROLE: num_role, nom
OBTIENT, 0N ROLE, 11 UTILISATEUR
UTILISATEUR: num_utilisateur, nom
POSSEDE, 0N PARTICIPATION, 0N UTILISATEUR
PARTICIPATION: num_participation
REALISE, 0N PARTICIPATION, 1N DEFI
:
:

JEUX VIDEO: num_jeux, nom
PROPOSE, 0N JEUX VIDEO, 0N UTILISATEUR
GAGNE, 0N UTILISATEUR, 0N POINT
POINT: num_point, quantité
ADHERE, 0N DEFI, 1N UTILISATEUR
DEFI: num_defi, nom
VOTER, 0N VOTE, 0N DEFI
VOTE: num_vote
```