// Esperar a que el DOM esté completamente cargado
window.addEventListener('DOMContentLoaded', () => {
    // Referencia al botón
    const botonMostrar = document.getElementById("botonMostrar");

    // Agregar el evento click al botón
    botonMostrar.addEventListener('click', mostrarValores);
});

function mostrarValores() {
    // Referenciando el valor del <select>
    const selectValue = document.getElementById('selectElement').value;

    // Referenciando el valor del <datalist>
    const datalistValue = document.getElementById('datalistInput').value;

    // Mostrando los valores
    const resultado = `
        Valor del Select: ${selectValue} <br>
        Valor del Datalist: ${datalistValue}
    `;
    document.getElementById('resultado').innerHTML = resultado;

    // Comentarios sobre las diferencias
    /*
        1. En el caso del <select>, el valor es directamente el atributo "value" del 
            <option> seleccionado, accesible a través de la propiedad `.value` del elemento <select>.
        2. En el caso del <datalist>, el valor es lo que el usuario introduce en el <input>
            asociado, que puede coincidir o no con los valores definidos en las opciones del <datalist>.
        3. El <datalist> permite introducir texto libre, mientras que el <select> limita la selección 
            a las opciones predefinidas.
    */
}