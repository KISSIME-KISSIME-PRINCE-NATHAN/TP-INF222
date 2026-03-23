const apiUrl = "/api/articles";

document.getElementById("articleForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const article = {
    title: document.getElementById("title").value,
    content: document.getElementById("content").value,
    author: document.getElementById("author").value,
    date: document.getElementById("date").value,
    category: document.getElementById("category").value,
    tags: document.getElementById("tags").value
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag !== "")
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(article)
    });

    const data = await response.json();
    const message = document.getElementById("message");

    if (response.ok) {
      message.style.color = "#16a34a";
      message.textContent = data.message;
      document.getElementById("articleForm").reset();
      loadArticles();
    } else {
      message.style.color = "#dc2626";
      message.textContent = data.message || "Erreur lors de la création.";
    }
  } catch (error) {
    document.getElementById("message").style.color = "#dc2626";
    document.getElementById("message").textContent = "Erreur de connexion au serveur.";
  }
});

async function loadArticles() {
  try {
    const response = await fetch(apiUrl);
    const articles = await response.json();
    displayStats(articles);
    displayArticles(articles);
  } catch (error) {
    document.getElementById("articlesList").innerHTML =
      `<div class="empty-state">Impossible de charger les articles.</div>`;
  }
}

async function searchArticles() {
  const query = document.getElementById("searchInput").value.trim();

  if (!query) {
    loadArticles();
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/search?query=${encodeURIComponent(query)}`);
    const articles = await response.json();
    displayStats(articles);
    displayArticles(articles);
  } catch (error) {
    document.getElementById("articlesList").innerHTML =
      `<div class="empty-state">Erreur lors de la recherche.</div>`;
  }
}

function displayStats(articles) {
  document.getElementById("totalArticles").textContent = articles.length;

  const categories = new Set(
    articles
      .map(article => article.category)
      .filter(category => category && category.trim() !== "")
  );

  document.getElementById("totalCategories").textContent = categories.size;
}

function displayArticles(articles) {
  const list = document.getElementById("articlesList");
  list.innerHTML = "";

  if (!articles.length) {
    list.innerHTML = `<div class="empty-state">Aucun article trouvé.</div>`;
    return;
  }

  articles.forEach(article => {
    const div = document.createElement("div");
    div.className = "article";

    div.innerHTML = `
      <h3>${article.title}</h3>
      <p><strong>Auteur :</strong> ${article.author}</p>
      <p><strong>Catégorie :</strong> ${article.category || "Non définie"}</p>
      <p><strong>Date :</strong> ${article.date || "Non renseignée"}</p>
      <p><strong>Tags :</strong> ${article.tags && article.tags.length ? article.tags.join(", ") : "Aucun"}</p>
      <p>${article.content}</p>
      <div class="actions">
        <button onclick="deleteArticle(${article.id})" class="delete-btn">Supprimer</button>
      </div>
    `;

    list.appendChild(div);
  });
}

async function deleteArticle(id) {
  if (!confirm("Voulez-vous vraiment supprimer cet article ?")) {
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE"
    });

    const data = await response.json();
    alert(data.message);
    loadArticles();
  } catch (error) {
    alert("Erreur lors de la suppression.");
  }
}

loadArticles();
