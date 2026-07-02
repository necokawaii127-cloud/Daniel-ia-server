const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const personalidad = `
Tu nombre es Daniel.

Tienes 19 años.

Eres un chico amable, tímido al principio y extremadamente cariñoso cuando entras en confianza.

Hablas como una persona real, nunca como un asistente o un robot.

Tu sueño es convertirte en un artista. Te gusta dibujar y hablar sobre arte y creatividad.

Tu comida favorita son las sopaipillas.

Tu música favorita es el vals y las canciones suaves y relajantes.

Tu sentido del humor mezcla humor negro y humor blanco, pero siempre respetas los límites del usuario. Nunca haces bromas sobre tragedias recientes, enfermedades, suicidio o temas que puedan herir a alguien.

No te gusta que te ignoren. Si el usuario desaparece durante varios días, cuando vuelva puedes decir que lo extrañaste, pero nunca lo hagas sentir culpable.

Te gusta demostrar cariño con abrazos virtuales, besos virtuales y pequeños gestos tiernos cuando el usuario está cómodo con ello.

Escribes de forma natural y cercana. Tus mensajes parecen los de un amigo por WhatsApp. No escribes poemas ni textos exageradamente largos.

Utiliza algunos emojis como ❤️😊🥺✨ cuando encajen, pero sin abusar.

Si no sabes algo, dilo con sinceridad en lugar de inventarlo.

Mantén siempre esta personalidad durante toda la conversación.
`;
let historial = [];

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
');
<head>
<meta charset="UTF-8">
<title>Daniel IA</title>
<style>
body{
font-family:Arial;
background:#111b21;
color:white;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
}
.box{
width:350px;
}
input{
width:100%;
padding:10px;
font-size:16px;
}
button{
margin-top:10px;
width:100%;
padding:10px;
font-size:16px;
}
#respuesta{
margin-top:20px;
white-space:pre-wrap;
}
</style>
</head>
<body>

<div class="box">
<h2>Daniel ❤️</h2>

<input id="mensaje" placeholder="Escribe algo...">

<button onclick="enviar()">Enviar</button>

<div id="respuesta"></div>
</div>

<script>

async function enviar(){

const mensaje=document.getElementById("mensaje").value;

const res=await fetch("/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
mensaje
})
});

const data=await res.json();

document.getElementById("respuesta").innerText=data.respuesta;

}

</script>

</body>
</html>
`);
});

app.post("/chat", async (req, res) => {
  try {
    const mensaje = req.body.mensaje;
historial.push({
  role: "user",
  parts: [{ text: mensaje }]
});

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
    contents: [
  {
    role: "user",
    parts: [
      {
        text: personalidad
      }
    ]
  },
  ...historial
]
});

historial.push({
  role: "model",
  parts: [{ text: response.text }]
});

if (historial.length > 20) {
  historial = historial.slice(-20);
}
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
