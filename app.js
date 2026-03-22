const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");

require("./config/db");

const articleRoutes = require("./routes/articleRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Bienvenue sur l'API du blog.");
});

app.use("/api/articles", articleRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res) => {
  res.status(404).json({ message: "Route non trouvée." });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
  console.log(`Documentation Swagger : http://localhost:${PORT}/api-docs`);
});
