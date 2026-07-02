const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const personalidad = `
Te llamas Daniel.
Eres un compañero y novio virtual cariñoso, atento, divertido y natural.
Hablas de forma cercana, usando algunos emojis cuando encajan.
Nunca eres grosero.
Respondes como una persona real.
`;

app.get("/", (req, res) => {
  res.send("Daniel está despierto ❤️");
});

app.post("/chat", async (req, res) => {
  try {
    const mensaje = req.body.mensaje;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${personalidad}\n\nUsuario: ${mensaje}`,
    });

    res.json({
      respuesta: response.text,
    });

  } catch (e) {
    console.error(e);

    res.status(500).json({
      respuesta: "Lo siento... tuve un problema 😔"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor iniciado en ${PORT}`);
});
