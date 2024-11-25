let ventanaHija;
function abrirVentana(){
    ventanaHija = window.open('hija.html', 'Ventana Hija', 'width=400,height=400');
}

function enviarMensajePadre() {
    const mensaje = document.getElementById("mensajePadre").value;
    ventanaHija.postMessage(mensaje+'',"*");
}

window.addEventListener("message", function(event) {
    document.getElementById("respuestaPadre").innerText = "Mensaje de la hija: " + event.data;
});
window.addEventListener("message", function(event) {
    console.log(document.getElementById("respuestaHija"));
    document.getElementById("respuestaHija").innerText = "Mensaje del padre: " + event.data;
});

function enviarMensajeHija() {
    const mensaje = document.getElementById("mensajeHija").value;
    window.opener.postMessage(mensaje, "*");
}