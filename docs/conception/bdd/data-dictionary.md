# Dictionnaire de données

> Le dictionnaire de données est une description détaillée des éléments de données utilisés dans chaque table de la base de données.

## Colonnes

1. nom de la table
2. nom technique des attributs
3. libellé (en français repris depuis le MCD)
4. type de données (ex: INT, VARCHAR, DATE, etc.)
5. taille (le cas échéant, ex: VARCHAR(255))
6. contraintes (ex: NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, etc.)

| Table              | Nom technique      | Libellé                | Type    | Taille | Contraintes                              |
|--------------------|--------------------|------------------------|---------|--------|------------------------------------------|
| User               | id                 | num_utilisateur        | INT     | 11     | PRIMARY KEY, AUTO_INCREMENT              |
| User               | email              | email                  | VARCHAR | 255    | NOT NULL                                 |
| User               | pseudo             | pseudo                 | VARCHAR | 20     | NOT NULL, UNIQUE                         |
| User               | name               | nom                    | VARCHAR | 50     | NOT NULL                                 |
| User               | password           | mot_de_passe           | VARCHAR | 30     | NOT NULL                                 |
| User               | address            | adresse                | VARCHAR | 255    | NULL                                     |
| User               | urlChannel         | url_chaine             | VARCHAR | 255    | NULL                                     |
| User               | id_role            | num_role               | INT     | 11     | FOREIGN KEY REFERENCES Role(id)          |
| Role               | id                 | num_role               | INT     | 11     | PRIMARY KEY, AUTO_INCREMENT              |
| Role               | name               | nom_role               | VARCHAR | 50     | NOT NULL, UNIQUE                         |
| Challenge          | id                 | num_challenge          | INT     | 11     | PRIMARY KEY, AUTO_INCREMENT              |
| Challenge          | name               | nom                    | VARCHAR | 100    | NOT NULL                                 |
| Challenge          | description        | description            | TEXT    | N/A    | NOT NULL                                 |
| Challenge          | rules              | règles                 | TEXT    | N/A    | NOT NULL                                 |
| Challenge          | level              | difficulté             | INT     | 11     | NOT NULL                                 |
| Challenge          | reference_duration | durée_référence        | INT     | 11     | NOT NULL                                 |
| Challenge          | id_user            | num_utilisateur        | INT     | 11     | FOREIGN KEY REFERENCES User(id)          |
| Challenge          | id_game            | num_jeu                | INT     | 11     | FOREIGN KEY REFERENCES Game(id)          |
| Participation      | id                 | num_participation      | INT     | 11     | PRIMARY KEY, AUTO_INCREMENT              |
| Participation      | duration           | durée                  | INT     | 11     | NOT NULL                                 |
| Participation      | video_url          | url_vidéo              | VARCHAR | 255    | NOT NULL                                 |
| Participation      | id_user            | num_utilisateur        | INT     | 11     | FOREIGN KEY REFERENCES User(id)          |
| Participation      | id_challenge       | num_challenge          | INT     | 11     | FOREIGN KEY REFERENCES Challenge(id)     |
| Game               | id                 | num_jeu                | INT     | 11     | PRIMARY KEY, AUTO_INCREMENT              |
| Game               | name               | nom_jeu                | VARCHAR | 100    | NOT NULL                                 |
| Game               | category           | catégorie              | VARCHAR | 50     | NOT NULL                                 |
| Game               | description        | description            | TEXT    | N/A    | NOT NULL                                 |
| vote_participation | id                 | num_vote_participation | INT     | 11     | PRIMARY KEY, AUTO_INCREMENT              |
| vote_participation | id_user            | num_utilisateur        | INT     | 11     | FOREIGN KEY REFERENCES User(id)          |
| vote_participation | id_participation   | num_participation      | INT     | 11     | FOREIGN KEY REFERENCES Participation(id) |
| vote_challenge     | id                 | num_vote_challenge     | INT     | 11     | PRIMARY KEY, AUTO_INCREMENT              |
| vote_challenge     | id_user            | num_utilisateur        | INT     | 11     | FOREIGN KEY REFERENCES User(id)          |
| vote_challenge     | id_challenge       | num_challenge          | INT     | 11     | FOREIGN KEY REFERENCES Challenge(id)     |

