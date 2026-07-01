const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor Daniel funcionando ❤️");
});

app.post("/chat", async (req, res) => {
  res.json({
    respuesta: "Hola ❤️ Soy Daniel. Aún estoy configurándome, pero pronto podré hablar contigo."
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor iniciado");
});
