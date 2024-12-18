function mostrarValores() {
    const selectElement = document.getElementById("selectElement");
    const datalistInput = document.getElementById("datalistInput");
    const resultado = document.getElementById("resultado");

    // Obtener el valor seleccionado en el select
    const valorSelect = selectElement.value;

    // Obtener el valor ingresado o seleccionado en el datalist
    const valorDatalist = datalistInput.value;

    // Validar el valor del datalist para asegurarse de que coincida con una opción válida
    const opcionesDatalist = Array.from(document.querySelectorAll("#datalistElement option")).map(option => option.value);
    if (!opcionesDatalist.includes(valorDatalist)) {
        resultado.textContent = "Por favor, selecciona una opción válida en el Datalist.";
        resultado.style.color = "red";
        return;
    }

    // Mostrar los valores seleccionados
    resultado.textContent = `Valor seleccionado en Select: ${valorSelect}\nValor ingresado en Datalist: ${valorDatalist}`;
    resultado.style.color = "green";
}
