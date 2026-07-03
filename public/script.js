async function enviar() {
  const input = document.getElementById("mensaje");
  const mensaje = input.value.trim();

  if (!mensaje) return;

  const chat = document.getElementById("respuesta");

  chat.innerHTML += `
    <div style="text-align:right;margin:10px;">
      <span style="background:#005c4b;color:white;padding:10px;border-radius:10px;display:inline-block;">
        ${mensaje}
      </span>
    </div>
  `;

  input.value = "";

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mensaje: mensaje
      })
    });

    const data = await res.json();

    chat.innerHTML += `
      <div style="text-align:left;margin:10px;">
        <span style="background:#202c33;color:white;padding:10px;border-radius:10px;display:inline-block;">
          ${data.respuesta}
        </span>
      </div>
    `;

    chat.scrollTop = chat.scrollHeight;

  } catch (error) {
    chat.innerHTML += `
      <div style="color:red;margin:10px;">
        Error al conectar con el servidor.
      </div>
    `;
  }
}
