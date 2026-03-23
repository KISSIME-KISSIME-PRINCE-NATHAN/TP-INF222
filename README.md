
    Nom : KISSIME KISSIME
    Prénom : PRINCE NATHAN
    Matricule : 24G2151
    UE : INF222 – Développement Backend
    Filière : INFO FONDA L2
# Blog API

API backend de gestion d’articles de blog développée avec **Node.js**, **Express.js**, **SQLite** et **Swagger UI**, avec une interface web simple pour créer, afficher, rechercher et supprimer des articles. Ce projet a été réalisé dans le cadre du cours **INF222 – Développement Backend**.

## Technologies utilisées
- Node.js
- Express.js
- SQLite
- Swagger UI
- HTML / CSS / JavaScript
- CORS
- Nodemon

## Fonctionnalités
- créer un article ;
- afficher tous les articles ;
- afficher un article par ID ;
- modifier un article ;
- supprimer un article ;
- rechercher un article par mot-clé ;
- filtrer les articles par catégorie, auteur ou date ;
- tester l’API avec Swagger ;
- utiliser une interface graphique web.

## Structure du projet
```bash
blog-api/
├── app.js
├── package.json
├── database.db
├── README.md
├── config/
│   └── db.js
├── controllers/
│   └── articleController.js
├── models/
│   └── articleModel.js
├── routes/
│   └── articleRoutes.js
├── swagger/
│   └── swagger.js
└── public/
    ├── index.html
    ├── style.css
    └── script.js

**INSTALLATION ET LANCEMENT**

    Vérifier que Node.js et npm sont installés 
    Si nécessaire, installer Node.js et npm 
    Se placer dans le dossier du projet 
    Installer les dépendances 
    Lancer l’application en mode développement: npm run dev ou en mode normal :npm start

    Ouvrir dans le navigateur :

    Interface web : http://localhost:3000
    Documentation Swagger : http://localhost:3000/api-docs

**Base de données**
 Le projet utilise une base SQLite stockée dans le fichier database.db. La base et la table articles sont créées automatiquement au démarrage si elles n’existent pas.

Endpoints principaux:

    *POST /api/articles : créer un article
    *GET /api/articles : récupérer tous les articles
    *GET /api/articles/:id : récupérer un article par ID
    *PUT /api/articles/:id : modifier un article
    *DELETE /api/articles/:id : supprimer un article
    *GET /api/articles/search/query=texte : rechercher un article

L’API vérifie que le titre, le contenu et l’auteur sont renseignés. Elle utilise les codes HTTP suivants :

    200 OK
    201 Created
    400 Bad Request
    404 Not Found
    500 Internal Server Error

  


