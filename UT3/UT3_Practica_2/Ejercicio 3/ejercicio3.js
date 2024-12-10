// Función para abrir una nueva ventana
function abrirNuevaVentana() {
    var nuevaVentana = window.open("", "NuevaVentana", "width=400,height=300,resizable=no");
    
    if (nuevaVentana) {
        nuevaVentana.document.write("<h3>Ejemplo de Ventana Nueva</h3>");
        nuevaVentana.document.write("URL Completa: " + window.location.href + "<br>");
        nuevaVentana.document.write("Protocolo utilizado: " + window.location.protocol + "<br>");
        nuevaVentana.document.write("Nombre en código del navegador: " + navigator.appCodeName + "<br>");
        
        if (navigator.javaEnabled()) {
            nuevaVentana.document.write("Java SI disponible en esta ventana.<br>");
        } else {
            nuevaVentana.document.write("Java NO disponible en esta ventana.<br>");
        }
    } else {
        alert("No se pudo abrir la nueva ventana.");
    }
}

// Llamamos a la función para abrir la ventana al cargar
abrirNuevaVentana();

// Función para procesar los datos del formulario
function procesarDatos() {
    var nombre = document.getElementById("nombre").value;
    var dia = document.getElementById("dia").value;
    var mes = document.getElementById("mes").value;
    var anio = document.getElementById("anio").value;

    if (!nombre || !dia || !mes || !anio) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Cálculos
    var edad = new Date().getFullYear() - anio;
    var primeraA = nombre.toUpperCase().indexOf('A');
    var ultimaA = nombre.toUpperCase().lastIndexOf('A');
    var nombreSin3Primeras = nombre.substring(3);
    var nombreMayus = nombre.toUpperCase();
    var fechaNacimiento = new Date(anio, mes - 1, dia);
    var dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    var diaSemana = dias[fechaNacimiento.getDay()];

    var resultado = `
        <hr/>
        Buenos días ${nombre}<br>
        Tu nombre tiene ${nombre.length} caracteres, incluidos espacios.<br>
        La primera letra A de tu nombre está en la posición: ${primeraA === -1 ? "No hay A" : primeraA + 1}<br>
        La última letra A de tu nombre está en la posición: ${ultimaA === -1 ? "No hay A" : ultimaA + 1}<br>
        Tu nombre menos las 3 primeras letras es: ${nombreSin3Primeras}<br>
        Tu nombre todo en mayúsculas es: ${nombreMayus}<br>
        Tu edad es: ${edad} años.<br>
        Naciste un feliz ${diaSemana} del año ${anio}.<br>
        El coseno de 180 es: ${Math.cos(180 * Math.PI / 180)}<br>
        El número mayor de (34, 67, 23, 75, 35, 19) es: ${Math.max(34, 67, 23, 75, 35, 19)}<br>
        Ejemplo de número al azar: ${Math.random()}
    `;

    document.getElementById("resultado").innerHTML = resultado;
}