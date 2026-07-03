async function enviar() {
    const input = document.getElementById("mensaje");
    const mensaje = input.value.trim();

    if (!mensaje) return;

    const chat = document.getElementById("respuesta");

    // Mostrar mensaje del usuario
    chat.innerHTML += `
        <div class="usuario">
            ${mensaje}
        </div>
    `;

    input.value = "";
    chat.scrollTop = chat.scrollHeight;

    // Indicador de escritura
    chat.innerHTML += `
        <div class="daniel" id="escribiendo">
            Daniel está escribiendo...
        </div>
    `;

    chat.scrollTop = chat.scrollHeight;

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

        document.getElementById("escribiendo").remove();

        chat.innerHTML += `
            <div class="daniel">
                ${data.respuesta}
            </div>
        `;

        chat.scrollTop = chat.scrollHeight;

    } catch (error) {

        const escribiendo = document.getElementById("escribiendo");

        if (escribiendo) escribiendo.remove();

        chat.innerHTML += `
            <div class="daniel">
                Lo siento... tuve un problema 😔
            </div>
        `;

        chat.scrollTop = chat.scrollHeight;
    }
}
