const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "..", "database.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err.message);
  } else {
    console.log("Connexion à SQLite réussie.");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      author TEXT NOT NULL,
      date TEXT NOT NULL,
      category TEXT,
      tags TEXT
    )
  `);
});

module.exports = db;
