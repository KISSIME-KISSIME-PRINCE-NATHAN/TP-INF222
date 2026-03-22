const db = require("../config/db");

const ArticleModel = {
  createArticle: (article, callback) => {
    const sql = `
      INSERT INTO articles (title, content, author, date, category, tags)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
      article.title,
      article.content,
      article.author,
      article.date,
      article.category,
      JSON.stringify(article.tags || [])
    ];

    db.run(sql, values, function (err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, {
          id: this.lastID,
          ...article
        });
      }
    });
  },

  getAllArticles: (filters, callback) => {
    let sql = "SELECT * FROM articles WHERE 1=1";
    const params = [];

    if (filters.category) {
      sql += " AND category = ?";
      params.push(filters.category);
    }

    if (filters.author) {
      sql += " AND author = ?";
      params.push(filters.author);
    }

    if (filters.date) {
      sql += " AND date = ?";
      params.push(filters.date);
    }

    db.all(sql, params, (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        const formattedRows = rows.map((row) => ({
          ...row,
          tags: row.tags ? JSON.parse(row.tags) : []
        }));
        callback(null, formattedRows);
      }
    });
  },

  getArticleById: (id, callback) => {
    const sql = "SELECT * FROM articles WHERE id = ?";
    db.get(sql, [id], (err, row) => {
      if (err) {
        callback(err, null);
      } else if (!row) {
        callback(null, null);
      } else {
        row.tags = row.tags ? JSON.parse(row.tags) : [];
        callback(null, row);
      }
    });
  },

  updateArticle: (id, article, callback) => {
    const sql = `
      UPDATE articles
      SET title = ?, content = ?, category = ?, tags = ?
      WHERE id = ?
    `;

    const values = [
      article.title,
      article.content,
      article.category,
      JSON.stringify(article.tags || []),
      id
    ];

    db.run(sql, values, function (err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, this.changes);
      }
    });
  },

  deleteArticle: (id, callback) => {
    const sql = "DELETE FROM articles WHERE id = ?";
    db.run(sql, [id], function (err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, this.changes);
      }
    });
  },

  searchArticles: (query, callback) => {
    const sql = `
      SELECT * FROM articles
      WHERE title LIKE ? OR content LIKE ?
    `;
    const searchValue = `%${query}%`;

    db.all(sql, [searchValue, searchValue], (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        const formattedRows = rows.map((row) => ({
          ...row,
          tags: row.tags ? JSON.parse(row.tags) : []
        }));
        callback(null, formattedRows);
      }
    });
  }
};

module.exports = ArticleModel;
