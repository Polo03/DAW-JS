// Referencia al formulario y al contenedor de salida
const form = document.getElementById('formulario');
const salida = document.getElementById('salida');
const submitButton = document.getElementById('submitBtn');

// Función para obtener y mostrar los datos del formulario
function mostrarDatos() {
    const elements = form.elements; // Acceso directo a los elementos del formulario
    let outputText = 
        `Fecha: ${elements.date.value}\n` +
        `Nivel de satisfacción: ${elements.range.value}\n` +
        `Contraseña: ${elements.password.value}\n` +
        `Teléfono: ${elements.tel.value}\n` +
        `Sitio web: <a href="${elements.url.value}" target="_blank">${elements.url.value}</a>\n`;

    // Mostrar los datos en el contenedor de salida
    salida.innerHTML = outputText.trim().replace(/\n/g, '<br>');
}

// Agregar el evento al botón
submitButton.addEventListener('click', mostrarDatos);
