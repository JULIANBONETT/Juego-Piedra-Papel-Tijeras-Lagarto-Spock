class Usuario {
    constructor() {
        this.listClientes = [];
    }

    registrar() {
        const formulario = document.getElementById("formRegistro2");
        formulario.addEventListener("submit", (event) => {
            event.preventDefault();
            const nombre = document.getElementById("nombreR").value;
            const correo = document.getElementById("correoR").value;
            const password = document.getElementById("passwordR").value;

            if (this.validarUsuario(correo)) {
                console.log("Usuario ya registrado.");
            } else {
                this.listClientes.push({ nombre, correo, password });
                console.log("Usuario registrado con exito.");
                setTimeout(()=>{
                    document.getElementById('formRegistro').style.display = 'none';
                    document.getElementById('formInicioSesion').style.display = 'grid';
                },10);
                console.log(this.listClientes);
                console.log("Usuario registrado con éxito.");
            }
        });
    }

    iniciarSesion() {
        const formulario = document.getElementById("formInicio");
        formulario.addEventListener("submit", (event) => {
            event.preventDefault();
            const correo = document.getElementById("correo").value;
            const password = document.getElementById("password").value;

            const usuario = this.listClientes.find(u => u.correo === correo && u.password === password);
            if (usuario) {
                console.log("Inicio de sesión exitoso.");
                this.mostrarJuego();
            } else {
                console.log("Correo o contraseña incorrectos.");
            }
        });
    }

    mostrarJuego() {
        document.getElementById("formInicioSesion").style.display = "none";
        document.getElementById("formRegistro").style.display = "none";
        document.getElementById("ff").style.display="none";
        document.getElementById("juego").style.display = "block";
    }

    validarUsuario(correo) {
        return this.listClientes.some(usuario => usuario.correo === correo);
    }
}

const usuario = new Usuario();
document.getElementById("Registroo").addEventListener("click", () => usuario.registrar());
document.getElementById("Inicioo").addEventListener("click", () => usuario.iniciarSesion());
document.getElementById("mostrarRegistro").addEventListener("click", () => {
    document.getElementById("formInicioSesion").style.display = "none";
    document.getElementById("formRegistro").style.display = "grid";
});

//juego
const seccionBatalla = document.getElementById('campo-batalla');
const msjBatalla = document.getElementById('msj-batalla');
const imgAtaqueJugador = document.getElementById('img-ataque-jugador');
const imgAtaquePc = document.getElementById('img-ataque-pc');
const btnPiedra = document.getElementById('btn-piedra');
const btnPapel = document.getElementById('btn-papel');
const btnTijeras = document.getElementById('btn-tijeras');
const btnLagarto = document.getElementById('btn-lagarto');
const btnSpock = document.getElementById('btn-spock');


let ganadas = 0;
let perdidas = 0;

document.getElementById("reiniciar").addEventListener("click", () => {
    reiniciarJuego();
});

const imagenes = [
    { name: "Piedra", url: "imagenes/converted_image.png" },
    { name: "Papel", url: "imagenes/converted_image_3.png" },
    { name: "Tijeras", url: "imagenes/converted_image_2.png" },
    { name: "Lagarto", url: "imagenes/converted_image_1.png" },
    { name: "Spock", url: "imagenes/converted_image (1).png" }
];

function iniciar() {
    seccionBatalla.style.display = 'none';
    document.getElementById('ganadas').textContent = ganadas;
    document.getElementById('perdidas').textContent = perdidas;
}

function nAleatorio() {
    return Math.floor(Math.random() * imagenes.length);
}

function batalla(opcionJugador) {
    const opcionPc = imagenes[nAleatorio()].name;
    if (opcionJugador === opcionPc) {
        msjBatalla.innerHTML = "Empate";
    } else if (
        (opcionJugador === "Piedra" && (opcionPc === "Tijeras" || opcionPc === "Lagarto")) ||
        (opcionJugador === "Papel" && (opcionPc === "Piedra" || opcionPc === "Spock")) ||
        (opcionJugador === "Tijeras" && (opcionPc === "Papel" || opcionPc === "Lagarto")) ||
        (opcionJugador === "Lagarto" && (opcionPc === "Spock" || opcionPc === "Papel")) ||
        (opcionJugador === "Spock" && (opcionPc === "Tijeras" || opcionPc === "Piedra"))
    ) {
        msjBatalla.innerHTML = "¡Ganaste!";
        ganadas++;
    } else {
        msjBatalla.innerHTML = "Perdiste :(";
        perdidas++;
    }

    actualizarImagenes(opcionJugador, opcionPc);
    actualizarResultados();
}

function actualizarImagenes(opcionJugador, opcionPc) {
    const imgJugador = imagenes.find(img => img.name === opcionJugador).url;
    const imgPc = imagenes.find(img => img.name === opcionPc).url;

    imgAtaqueJugador.innerHTML = `<img class="img-batalla" src="${imgJugador}" alt="${opcionJugador}">`;
    imgAtaquePc.innerHTML = `<img class="img-batalla" src="${imgPc}" alt="${opcionPc}">`;

    seccionBatalla.style.display = 'flex';
}

function actualizarResultados() {
    document.getElementById('ganadas').textContent = ganadas;
    document.getElementById('perdidas').textContent = perdidas;
}

function reiniciarJuego() {
    ganadas = 0;
    perdidas = 0;
    actualizarResultados();
    msjBatalla.innerHTML = "¡Elige tu opción para empezar!";
    seccionBatalla.style.display = 'none';
}

btnPiedra.addEventListener('click', () => batalla("Piedra"));
btnPapel.addEventListener('click', () => batalla("Papel"));
btnTijeras.addEventListener('click', () => batalla("Tijeras"));
btnLagarto.addEventListener('click', () => batalla("Lagarto"));
btnSpock.addEventListener('click', () => batalla("Spock"));

window.addEventListener('load', iniciar);
