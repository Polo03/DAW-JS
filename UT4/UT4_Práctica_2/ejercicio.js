var contenidoFichero="";
const select = document.getElementById('productoSelect');
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            contenidoFichero = e.target.result;
            var datos = contenidoFichero.split('\r\n');
            
            // Rellenar el menú desplegable
            datos.forEach(producto => {
                const [nombre, precio] = producto.split(';'); // Separar nombre y precio
                const option = document.createElement('option'); //Creamos el elemento option, que se añadará al desplegable
                option.value = precio; // Asigna el precio como valor de la opción
                option.textContent = nombre; // Establece el nombre como texto visible
                select.appendChild(option); // Agrega la opción al select
            });
        };
        reader.readAsText(file); 
    }
});
// Mostrar el precio al seleccionar un producto
select.addEventListener('change', function() {
    const precio = this.value;
    document.getElementById('precio').textContent = precio ? `Precio: ${precio}` : '';
});