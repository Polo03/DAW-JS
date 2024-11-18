var contenidoFichero="";
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            contenidoFichero = e.target.result;
            console.log(contenidoFichero);
        };

        reader.readAsText(file);

        
    } else {
        console.error('No se ha seleccionado un fichero');
    }
});
function ejercicio2(){
    var datos = new Array();
    datos=contenidoFichero.split('/n');
    document.getElementById('contenidoArray').innerHTML=datos+'';
}
