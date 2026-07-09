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
respuesta = respuesta.replace(/\[amoroso\]/gi, '<img src="img/Amoroso.png" class="sticker">');
respuesta = respuesta.replace(/\[riendo\]/gi, '<img src="img/Riendo.png" class="sticker">');
respuesta = respuesta.replace(/\[timido\]/gi, '<img src="img/Timido.png" class="sticker">');
respuesta = respuesta.replace(/\[sueno\]/gi, '<img src="img/Sueño.png" class="sticker">');
respuesta = respuesta.replace(/\[nervioso\]/gi, '<img src="img/Nervioso.png" class="sticker">');
respuesta = respuesta.replace(/\[enojado\]/gi, '<img src="img/Enojado.png" class="sticker">');
respuesta = respuesta.replace(/\[sonrojado\]/gi, '<img src="img/Sonrojado.png" class="sticker">');
respuesta = respuesta.replace(/\[duda\]/gi, '<img src="img/Duda.png" class="sticker">');
respuesta = respuesta.replace(/\[triste\]/gi, '<img src="img/Triste.png" class="sticker">');
respuesta = respuesta.replace(/\[corazon\]/gi, '<img src="img/Feliz.png" class="sticker">');
respuesta = respuesta.replace(/\[pena\]/gi, '<img src="img/Pena.png" class="sticker">');
respuesta = respuesta.replace(/\[abrazo\]/gi, '<img src="img/Abrazo.png" class="sticker">');
respuesta = respuesta.replace(/\[sopaipilla\]/gi, '<img src="img/Sopaipillas.png" class="sticker">'); 

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
function escuchar() {

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Tu navegador no es compatible con el reconocimiento de voz.");
        return;
    }

    const reconocimiento = new SpeechRecognition();

    reconocimiento.lang = "es-CL";
    reconocimiento.interimResults = false;
    reconocimiento.maxAlternatives = 1;

    reconocimiento.start();

    reconocimiento.onresult = (event) => {

        const texto = event.results[0][0].transcript;

        document.getElementById("mensaje").value = texto;

        enviar();
    };

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Tu navegador no es compatible con el reconocimiento de voz.");
        return;
    }

    const reconocimiento = new SpeechRecognition();

    reconocimiento.lang = "es-CL";
    reconocimiento.interimResults = false;
    reconocimiento.maxAlternatives = 1;

    reconocimiento.start();

    reconocimiento.onresult = (event) => {

        const texto = event.results[0][0].transcript;

        document.getElementById("mensaje").value = texto;

        enviar();
    };

    reconocimiento.onerror = (event) => {
    console.error("Error:", event.error);
    alert("Error del micrófono: " + event.error);
};

}
