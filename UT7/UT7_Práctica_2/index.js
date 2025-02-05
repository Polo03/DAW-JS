function cargarCatalogo() {
    let xhr = new XMLHttpRequest(); // Crear el objeto XMLHttpRequest
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cargaXML(this); // Llamamos a la función cargaXML pasándole el objeto XMLHttpRequest
        }
    };
    xhr.open("GET", "catalogo.xml", true); // Solicitar el archivo XML
    xhr.send(); // Enviar la solicitud
}    
function cargaXML(xml) {
    let xmlDoc = xml.responseXML; // Guardar el contenido del XML
    let cds = xmlDoc.getElementsByTagName("CD"); // Obtener todos los elementos <CD>

    // Crear la tabla
    let tablaHTML = "<table><tr><th>Título</th><th>Artista</th><th>País</th><th>Compañía</th><th>Precio</th><th>Año</th></tr>";

    // Recorrer todos los elementos <CD> y extraer los datos
    for (let i = 0; i < cds.length; i++) {
        let titulo = cds[i].getElementsByTagName("TITLE")[0].textContent;
        let artista = cds[i].getElementsByTagName("ARTIST")[0].textContent;
        let pais = cds[i].getElementsByTagName("COUNTRY")[0].textContent;
        let compania = cds[i].getElementsByTagName("COMPANY")[0].textContent;
        let precio = cds[i].getElementsByTagName("PRICE")[0].textContent;
        let año = cds[i].getElementsByTagName("YEAR")[0].textContent;

        // Crear una fila en la tabla
        tablaHTML += "<tr><td>" + titulo + "</td><td>" + artista + "</td><td>" + pais + "</td><td>" + compania + "</td><td>" + precio + "</td><td>" + año + "</td></tr>";
    }

    tablaHTML += "</table>"; // Cerrar la tabla

    // Mostrar la tabla en el div con id "tabla"
    document.getElementById("tabla").innerHTML = tablaHTML;
}
