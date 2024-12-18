window.onload= function() {
    // Selección del formulario y botón
    const formulario = document.getElementById("formulario");
    const submitBtn = document.getElementById("submitBtn");
    const salida = document.getElementById("salida");

    // Función para validar campos
    function validarFormulario() {
        let errores = [];

        // Validar la fecha
        const fecha = document.getElementById("date");
        if (!fecha.value) {
            errores.push("La fecha es obligatoria.");
        }

        // Validar el rango
        const rango = document.getElementById("range");
        if (!rango.value || rango.value < 1 || rango.value > 10) {
            errores.push("El nivel de satisfacción debe estar entre 1 y 10.");
        }

        // Validar la contraseña
        const password = document.getElementById("password");
        if (!password.value || password.value.length < 8) {
            errores.push("La contraseña debe tener al menos 8 caracteres.");
        }

        // Validar el número de teléfono
        const telefono = document.getElementById("tel");
        const telefonoRegex = /^\d{3}\s\d{2}\s\d{2}\s\d{2}$/;
        if (!telefono.value || !telefonoRegex.test(telefono.value)) {
            errores.push("El número de teléfono debe tener el formato XXX XX XX XX.");
        }

        // Validar la URL
        const url = document.getElementById("url");
        try {
            new URL(url.value); // Verifica si la URL es válida
        } catch (e) {
            errores.push("El sitio web debe tener un formato válido (https://example.com).");
        }

        // Mostrar errores si existen
        if (errores.length > 0) {
            alert("Errores en el formulario:\n" + errores.join("\n"));
            return false;
        }

        return true;
    }

    // Manejar el evento click del botón de enviar
    submitBtn.addEventListener("click", () => {
        if (validarFormulario()) {
            // Si pasa las validaciones, muestra los datos en el pre
            const datos = {
                Fecha: document.getElementById("date").value,
                "Nivel de satisfacción": document.getElementById("range").value,
                Contraseña: document.getElementById("password").value,
                "Número de teléfono": document.getElementById("tel").value,
                "Sitio web": document.getElementById("url").value,
            };

            salida.textContent = JSON.stringify(datos, null, 2);
            alert("Formulario enviado con éxito.");
        }
    });

}
