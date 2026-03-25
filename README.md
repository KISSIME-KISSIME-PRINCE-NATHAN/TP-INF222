Nom : KISSIME KISSIME
    Prénom : PRINCE NATHAN
    Matricule : 24G2151
    UE : INF222 – Développement Backend
    Filière : INFO FONDA L2
# Blog API

API backend de gestion d’articles de blog développée avec *Node.js, **Express.js, **SQLite* et *Swagger UI, avec une interface web simple pour créer, afficher, rechercher et supprimer des articles. Ce projet a été réalisé dans le cadre du cours **INF222 – Développement Backend*.

## Technologies utilisées
- Node.js
- Express.js
- SQLite
- Swagger UI
- HTML / CSS / JavaScript
- CORS
- Nodemon
         
         
         
         
         📰 API-BLOG

Une API REST complète pour la gestion d'articles de blog, construite avec Node.js, Express et SQLite (better-sqlite3).
Elle inclut une interface web intégrée ainsi qu'une documentation Swagger interactive.

       🗂️ Structure du projet
API-BLOG/
├── config/
│   └── bd.js                  # Connexion à SQLite
├── controllers/
│   └── articleController.js   # Logique métier
├── models/
│   └── article.js             # Requêtes SQL
├── routes/
│   └── articles.js            # Routes + Swagger
├── public/
│   └── index.html             # Interface web
├── .env                       # Variables d'environnement
├── app.js                     # Point d'entrée
├── blog.bd                    # Base de données
└── package.json
⚙️ Prérequis
Node.js v18+
npm
        🚀 Installation
1. Cloner le projet

2. Installer les dépendances

3. Configurer les variables d'environnement

Créer un fichier .env :

PORT=3000
4. Lancer le serveur
npm run dev

👉 Le serveur démarre sur :
http://localhost:3000

🌐 Interface Web

Une interface graphique est disponible :

👉 http://localhost:3000

Fonctionnalités :
📊 Tableau de bord (statistiques)
📝 CRUD complet des articles
🔍 Recherche par mot-clé
🎯 Filtrage (catégorie, auteur, date)
📚 Documentation Swagger

Disponible en local :

👉 http://localhost:3000/api-docs

En production :

👉 https://api-blog-production-8f83.up.railway.app/api-docs

📡 Endpoints de l'API

Base URL :

http://localhost:3000/api
Méthode	Route	Description
GET	/articles	Récupérer tous les articles
GET	/articles/:id	Récupérer un article
POST	/articles	Créer un article
PUT	/articles/:id	Modifier un article
DELETE	/articles/:id	Supprimer un article
GET	/articles/search	Rechercher des articles

🏗️ Technologies utilisées
Technologie	Rôle
Node.js	Runtime JavaScript
Express.js	Framework web
better-sqlite3	Base de données
dotenv	Variables d'environnement
swagger-ui-express	Interface Swagger
swagger-jsdoc	Génération doc
nodemon	Dev (auto-reload)
Railway	Déploiement

📦 Scripts disponibles
Commande	Description
npm run dev	Mode développement
npm start	Mode production

