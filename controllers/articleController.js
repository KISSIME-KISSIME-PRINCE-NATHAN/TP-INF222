const ArticleModel = require("../models/articleModel");

exports.createArticle = (req, res) => {
  const { title, content, author, date, category, tags } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Le titre est obligatoire." });
  }

  if (!content || content.trim() === "") {
    return res.status(400).json({ message: "Le contenu est obligatoire." });
  }

  if (!author || author.trim() === "") {
    return res.status(400).json({ message: "L'auteur est obligatoire." });
  }

  const newArticle = {
    title: title.trim(),
    content: content.trim(),
    author: author.trim(),
    date: date || new Date().toISOString().split("T")[0],
    category: category ? category.trim() : "",
    tags: Array.isArray(tags) ? tags : []
  };

  ArticleModel.createArticle(newArticle, (err, article) => {
    if (err) {
      return res.status(500).json({
        message: "Erreur serveur lors de la création de l'article.",
        error: err.message
      });
    }

    return res.status(201).json({
      message: "Article créé avec succès.",
      article
    });
  });
};

exports.getAllArticles = (req, res) => {
  const filters = {
    category: req.query.category || null,
    author: req.query.author || null,
    date: req.query.date || null
  };

  ArticleModel.getAllArticles(filters, (err, articles) => {
    if (err) {
      return res.status(500).json({
        message: "Erreur serveur lors de la récupération des articles.",
        error: err.message
      });
    }

    return res.status(200).json(articles);
  });
};

exports.getArticleById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID invalide." });
  }

  ArticleModel.getArticleById(id, (err, article) => {
    if (err) {
      return res.status(500).json({
        message: "Erreur serveur lors de la récupération de l'article.",
        error: err.message
      });
    }

    if (!article) {
      return res.status(404).json({ message: "Article non trouvé." });
    }

    return res.status(200).json(article);
  });
};

exports.updateArticle = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, content, category, tags } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID invalide." });
  }

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Le titre est obligatoire." });
  }

  if (!content || content.trim() === "") {
    return res.status(400).json({ message: "Le contenu est obligatoire." });
  }

  const updatedArticle = {
    title: title.trim(),
    content: content.trim(),
    category: category ? category.trim() : "",
    tags: Array.isArray(tags) ? tags : []
  };

  ArticleModel.updateArticle(id, updatedArticle, (err, changes) => {
    if (err) {
      return res.status(500).json({
        message: "Erreur serveur lors de la mise à jour.",
        error: err.message
      });
    }

    if (changes === 0) {
      return res.status(404).json({ message: "Article non trouvé." });
    }

    return res.status(200).json({
      message: "Article mis à jour avec succès."
    });
  });
};

exports.deleteArticle = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID invalide." });
  }

  ArticleModel.deleteArticle(id, (err, changes) => {
    if (err) {
      return res.status(500).json({
        message: "Erreur serveur lors de la suppression.",
        error: err.message
      });
    }

    if (changes === 0) {
      return res.status(404).json({ message: "Article non trouvé." });
    }

    return res.status(200).json({
      message: "Article supprimé avec succès."
    });
  });
};

exports.searchArticles = (req, res) => {
  const query = req.query.query;

  if (!query || query.trim() === "") {
    return res.status(400).json({
      message: "Le paramètre query est obligatoire."
    });
  }

  ArticleModel.searchArticles(query.trim(), (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Erreur serveur lors de la recherche.",
        error: err.message
      });
    }

    return res.status(200).json(results);
  });
};
