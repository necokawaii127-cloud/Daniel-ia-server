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
.escribiendo{
    display:flex;
    align-items:center;
    gap:6px;
    width:60px;
}

.escribiendo span{
    width:10px;
    height:10px;
    background:#b48cff;
    border-radius:50%;
    animation:escribir 1.2s infinite;
}

.escribiendo span:nth-child(2){
    animation-delay:.2s;
}

.escribiendo span:nth-child(3){
    animation-delay:.4s;
}

@keyframes escribir{

    0%{
        transform:translateY(0);
        opacity:.4;
    }

    50%{
        transform:translateY(-6px);
        opacity:1;
    }

    100%{
        transform:translateY(0);
        opacity:.4;
    }

}
