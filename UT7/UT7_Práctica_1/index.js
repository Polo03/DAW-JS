window.onload = function(){
    document.getElementById("cambiarContenido").addEventListener("click", cambiaContenido);

    function cambiaContenido() {
        let xhr = new XMLHttpRequest(); // Crear objeto XMLHttpRequest
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("texto").innerHTML = this.responseText; // Cambiar contenido del div
            }
        };
        xhr.open("GET", "holamundo.txt", true); // Especificamos la solicitud
        xhr.send(); // Enviamos la solicitud
    } 
}

