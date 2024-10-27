let puntajeJugador = 0;
let puntajeComputadora = 0;
let rondaActual = 0;
let totalRondas = 5;
let juegoIniciado = false;

function iniciarJuego() {
    puntajeJugador = 0;
    puntajeComputadora = 0;
    rondaActual = 0;
    totalRondas = parseInt(document.getElementById("num-rondas").value);
    juegoIniciado = true;
    document.getElementById("num-rondas").disabled = true;
    document.getElementById("resultado").innerText = "";
    document.getElementById("puntaje-acumulado").innerText = "";
    document.getElementById("gif-img").style.display = "none"; // Ocultar el GIF al iniciar
}

function calcularResultado() {
    if (!juegoIniciado) {
        iniciarJuego();
    }

    if (rondaActual >= totalRondas) {
        document.getElementById("resultado").innerText = "El juego ha terminado. Por favor, reinicia el juego.";
        return;
    }

    const player = document.getElementById("player-strategy").value;
    const strategies = player === "lilo" ? ["stitch", "nani"] : ["leroy", "lilo"];
    const computer = strategies[Math.floor(Math.random() * strategies.length)];
    let resultado = "";

    const payoff = {
        "lilo-lilo": [5, 5],
        "lilo-stitch": [0, 10],
        "stitch-lilo": [10, 0],
        "stitch-stitch": [-1, -1],
        "stitch-leroy": [3, 3],
        "lilo-nani": [4, 2],
        "nani-lilo": [2, 4],
        "leroy-stitch": [1, 5],
        "leroy-lilo": [2, 4]
    };

    const gifs = {
        "lilo-lilo": "https://i.gifer.com/SAzs.gif",
        "lilo-stitch": "https://i.pinimg.com/originals/28/0e/bc/280ebc35f36d9571f08cd61ab422235d.gif",
        "stitch-lilo": "https://i.makeagif.com/media/5-18-2021/BVauIE.gif",
        "stitch-stitch": "https://64.media.tumblr.com/c72cbb396d266d601c7e6327f716691d/tumblr_pas1v4vVzV1x5kx98o3_400.gif",
        "stitch-leroy": "https://64.media.tumblr.com/c72cbb396d266d601c7e6327f716691d/tumblr_pas1v4vVzV1x5kx98o3_400.gif",
        "lilo-nani": "https://64.media.tumblr.com/2dd5c2957105b7635f677c0e25028d1e/f3ad5e58692f6fc5-1e/s540x810/e0643498928245259fe9d04d0e880fff5a156e6e.gifv",
        "leroy-lilo": "https://64.media.tumblr.com/c72cbb396d266d601c7e6327f716691d/tumblr_pas1v4vVzV1x5kx98o3_400.gif",
        "leroy-stitch": "https://64.media.tumblr.com/c72cbb396d266d601c7e6327f716691d/tumblr_pas1v4vVzV1x5kx98o3_400.gif"
    };

    const key = `${player}-${computer}`;
    const pagos = payoff[key];

    // Reproduce el sonido
    document.getElementById("sound-effect").play();

    if (pagos) {
        puntajeJugador += pagos[0];
        puntajeComputadora += pagos[1];
        resultado = `Ronda ${rondaActual + 1}: Tú elegiste ${player}, la computadora eligió ${computer}.\nResultado de la ronda: Jugador: ${pagos[0]} puntos, Computadora: ${pagos[1]} puntos.`;
        
        // Mostrar el GIF correspondiente en el <img>
        document.getElementById("gif-img").src = gifs[key];
        document.getElementById("gif-img").style.display = "block"; // Mostrar la imagen
    } else {
        resultado = "Opción no válida.";
    }

    rondaActual++;
    document.getElementById("resultado").innerText = resultado;
    document.getElementById("puntaje-acumulado").innerText = `Puntaje acumulado - Jugador: ${puntajeJugador} puntos, Computadora: ${puntajeComputadora} puntos.`;

    if (rondaActual >= totalRondas) {
        let mensajeFinal = "¡Juego terminado! ";
        if (puntajeJugador > puntajeComputadora) {
            mensajeFinal += "Has ganado.";
        } else if (puntajeJugador < puntajeComputadora) {
            mensajeFinal += "La computadora ha ganado.";
        } else {
            mensajeFinal += "Es un empate.";
        }
        document.getElementById("resultado").innerText += `\n\n${mensajeFinal}`;
    }
}

function reiniciarJuego() {
    iniciarJuego();
    juegoIniciado = false;
    document.getElementById("num-rondas").disabled = false;
}

// Nueva función para mostrar instrucciones
function mostrarInstrucciones() {
    alert("¡Instrucciones del juego!\n\n" +
          "¡El Gran Torneo de Ohana!\n" +
          "Objetivo: ¡Ser el jugador más astuto de Ohana! Elige entre Lilo (¡Ohana significa familia!) o Stitch (el más dulce de los 626 experimentos) y enfrenta a la computadora para ganar puntos.\n\n" +
          "Personajes:\n" +
          "Lilo: Nuestra pequeña alienígena favorita. Representa la estrategia de la paloma, es pacífica y busca la cooperación.\n" +
          "Stitch: Un experimento con un corazón enorme. Representa la estrategia del halcón, es un poco más agresivo y busca el beneficio individual.\n" +
          "Leroy: Un clon de Stitch, igual de travieso y con un instinto competitivo. Representa la estrategia del halcón.\n" +
          "Nani: La hermana mayor de Lilo, siempre cuidando de su 'ohana'. Representa la estrategia de la paloma.");
}

// Asignar evento al botón de instrucciones
document.getElementById("btn-instrucciones").addEventListener("click", mostrarInstrucciones);

reiniciarJuego();
