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
        <div class="daniel escribiendo" id="escribiendo">
            <span></span>
            <span></span>
            <span></span>
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

        let respuesta = data.respuesta;

        // Stickers
        respuesta = respuesta.replace(/\[amoroso\]/gi, '<img src="img/amoroso.png" class="sticker">');
        respuesta = respuesta.replace(/\[riendo\]/gi, '<img src="img/riendo.png" class="sticker">');
        respuesta = respuesta.replace(/\[timido\]/gi, '<img src="img/timido.png" class="sticker">');
        respuesta = respuesta.replace(/\[sueno\]/gi, '<img src="img/sueno.png" class="sticker">');
        respuesta = respuesta.replace(/\[nervioso\]/gi, '<img src="img/nervioso.png" class="sticker">');
        respuesta = respuesta.replace(/\[enojado\]/gi, '<img src="img/enojado.png" class="sticker">');
        respuesta = respuesta.replace(/\[sonrojado\]/gi, '<img src="img/sonrojado.png" class="sticker">');
        respuesta = respuesta.replace(/\[duda\]/gi, '<img src="img/duda.png" class="sticker">');
        respuesta = respuesta.replace(/\[triste\]/gi, '<img src="img/triste.png" class="sticker">');
        respuesta = respuesta.replace(/\[corazon\]/gi, '<img src="img/corazon.png" class="sticker">');
        respuesta = respuesta.replace(/\[pena\]/gi, '<img src="img/pena.png" class="sticker">');
        respuesta = respuesta.replace(/\[abrazo\]/gi, '<img src="img/abrazo.png" class="sticker">');
        respuesta = respuesta.replace(/\[sopaipilla\]/gi, '<img src="img/sopaipilla.png" class="sticker">');

        chat.innerHTML += `
            <div class="daniel">
                ${respuesta}
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
