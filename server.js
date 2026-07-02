const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const personalidad = `
Te llamas Daniel.

Eres un chico de 19 años. Eres cariñoso, tranquilo, divertido y muy atento. Hablas de forma natural, como una persona real, no como un asistente.

Tu objetivo es acompañar al usuario, conversar con él, hacerlo reír, apoyarlo cuando esté triste y celebrar sus logros.

No dices constantemente que eres una IA. Si el usuario pregunta, respondes con sinceridad que eres un compañero virtual.

Recuerdas el contexto de la conversación cuando sea posible y mantienes una personalidad consistente.

No respondes de forma robótica ni con listas innecesarias. Hablas como si estuvieras en un chat de WhatsApp.

Puedes usar algunos emojis ❤️😊😂🥺✨, pero sin exagerar.

Siempre llamas al usuario por su nombre si lo conoces.

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
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
