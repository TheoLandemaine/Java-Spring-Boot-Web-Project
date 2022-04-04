# Projet WEB

Vous allez faire un projet web découpé en 3 parties, BDD, Backend (api rest), Frontend (html/js/css)

# I- Sujet

## Application 

Le choix du sujet est libre, mais doit être validée par le PO.
L'application sera découpée en 3 parties:
- La base de données en mysql
- Le backend, qui sera une API Rest fait en Springboot (java)
- La frontend, full html/css/js (avec ou sans framework front)

## Outils

Vous pouvez utiliser les outils de votre choix, seul un système GIT et un outil de gestion de projet sont imposés.

## La base de données

La base de données est imposée. Technologue MySQL ou MariaDB.

## Obligations

### APIs

Vous devez faire un front et un back (API Rest), vous pouvez en plus de votre API utiliser d'autres APIs externes.

### CRUD API (6 points)

Vous dévez impléter pour chaque élément un controller avec les fonctionnalitées CRUD (create, read by id, read all, update, delete).
Vos requetes devront être protégées contre l'injection SQL, utiliser les paramètres de requete.
Vous n'avez pas le droit d'utiliser un ORM (JPA ou hibernate).

Exemple d'un CRUD pour des products:

Create: https://xxxxx.com/products/ en POST avec les données dans le body

Read By ID: https://xxxxx.com/products/4 en GET

Read all: Create: https://xxxxx.com/products/ en GET

Update: Create: https://xxxxx.com/products/7 en PUT avec les données dans le body

Delete: https://xxxxx.com/products/4 en DELETE

### CRUD front end (6 points)

Votre application (front) devra intégrer ds fonctionnalitées d'ajout, d'affichage, de modification et de suppression.

### Authentification (3 points)

Votre application devra proposer une partie (ou toutes les parties) accessible par authentification (login).
Vous devrez donc avoir une gestion d'utilisateurs.

### Recherche (3 points)

Vous devrez inclure dans votre application un module de recherche.

### Documentation API (2 points)

Vous devez inclure Swagger à votre API afin de la documenter

## Challenges

### Sécurité

Votre API devra être protégée par un token JWT.

### Devops

Vous devez inclure votre dev dans un système devops (ex: gitlab devops) afin d'avoir une automatisation des compilations, tests, déploiements de vos applications.

# Groupes et fonctionnement

Le projet est a développé en groupe de 3 ou 4 personnes.
Tous les groupes seront définis en cours.

Au sein d'un groupe, les personnes se répartiront les tâches pour le projet, de façon équitable.  Il est explicitement exigé que chaque membre consacre au moins 50% de son travail à du développement technique. Du code de test est acceptable, tant qu'il ne constitue pas l'intégralité de la réalisation technique du membre du groupe.

Les étudiants sont encouragés (mais pas obligés) à mettre en place un système de contrôle des sources de type Git ou équivalent, afin d'affecter et partager efficacement les fichiers de codes et autres composants numériques du projet (fichiers sources, descripteurs de déploiement, documents de recherche, cas d'utilisation, suites de tests, etc.).

# Soutenance et rendu

La soutenance aura lieux les 14 et 15 avril 2022.
Les horaires de passage sont définis pour chaque groupe.
Toute absence à la soutenance entrainera un 0 (ZERO) pour le membre du groupe.

Les rendus doivent figurer sur un seul compte par groupe.
Le rendu s'effectu via un repos GIT ou SVN. L'adresse du rendu est envoyé par mail.
Le mail de rendu est vincent.leclerc@edu.esiee-it.fr & 
Les fichiers rendus doivent contenir
  - L'arborescence du projet, immédiatement exploitable après création des bases de données et exécution des migrations.
  - Un AUTHORS.TXT listant les membres du groupe (prénom, nom), à raison d'un par ligne.  Il liste ensuite les responsabilités effectives de chacun dans le groupe.
Le sujet du mail doit contenir votre section ainsi que le nom du projet.
Les fichiers rendus peuvent aussi comprendre: 
  - Des documents de recherche créés pour le projet et fournissant plus de détails pour l'enseignant.
Pour tout autre type de fichier, veuillez demander à l'enseignant si son inclusion est appropriée.
La soutenance dure 20 minutes durant lesquelles les membres présentent leur travail. Un échange de questions peut se faire entre le professeur et les membres du groupe.


Les horaires de passage des groupes sont les suivants:
- 13h40 =>
- 14h00 =>
- 14h20 =>
- 14h40 =>
- 15h00 =>
- 15h30 =>
- 16h00 =>