// Configuración del server
const express = require("express");
const app = express();
const routes = require("./routes/index.js");
const db = require("./config/db");
const cors = require("cors");

app.use(
  cors({
    // Si aún no tenes deployado tu front en origin va la url local.
    // Una vez que se deploye el front acá va esa url que te entrega.
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", routes);

app.use("/api", (req, res) => {
  res.sendStatus(404);
});

// error middleware -> https://expressjs.com/es/guide/error-handling.html
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

db.sync({ force: false }).then(() => {
  app.listen(3001, () => console.log("Servidor escuchando en el puerto 3001"));
});
