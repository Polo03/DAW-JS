function crearParrafo() {
    const texto = document.getElementById('texto').value;
    const parrafo = document.createElement('p');
    parrafo.textContent = texto;
    parrafo.classList.add('miClase');
    document.getElementById('contenedor').appendChild(parrafo);
}

function crearImagen() {
    const ruta = prompt('Introduce la URL de la imagen:');
    if (ruta) {
        const imagen = document.createElement('img');
        imagen.src = ruta;
        document.getElementById('contenedor').appendChild(imagen);
    } else {
        alert('No se ha proporcionado una URL válida.');
    }
}

function borrarUltimo() {
    const contenedor = document.getElementById('contenedor');
    if (contenedor.lastChild) {
        contenedor.removeChild(contenedor.lastChild);
    } else {
        alert('No hay elementos para borrar.');
    }
}

function borrarPrimero() {
    const contenedor = document.getElementById('contenedor');
    if (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    } else {
        alert('No hay elementos para borrar.');
    }
}

function sustituirPrimeroVacio() {
    const contenedor = document.getElementById('contenedor');
    const parrafo = document.createElement('p');
    parrafo.textContent = 'Vacío';
    parrafo.classList.add('miClase');

    if (contenedor.firstChild) {
        contenedor.replaceChild(parrafo, contenedor.firstChild);
    } else {
        alert('No hay elementos para sustituir.');
    }
}