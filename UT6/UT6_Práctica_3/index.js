window.onload = function() {

    // Función para recorrer hacia adelante
    function recorrerAdelante(event) {
        const h2Element = event.target; // Elemento H2 clicado
        let texto = "Has elegido " + h2Element.textContent;

        // Referenciamos el padre del H2
        const parentDiv = h2Element.parentElement;
        texto += " que está situada en el " + parentDiv.id;

        recorrerHermanos(h2Element, texto);
    }

    // Función para recorrer hermanos 
    function recorrerHermanos(h2Element, texto) {
        const ulElement = h2Element.nextElementSibling; // Accedemos al hermano (UL)
        const numProvincias = ulElement.children.length; // Contamos el número de LI
        texto += ". El número de provincias es: " + numProvincias;

        recorrerHijos(ulElement, texto);
    }

    // Función para recorrer hijos
    function recorrerHijos(ulElement, texto) {
        let currentChild = ulElement.firstElementChild; // Primer hijo del UL
        texto += ". Las provincias son: ";
        while (currentChild !== null) {
            texto += currentChild.textContent + ", ";
            currentChild = currentChild.nextElementSibling; // Siguiente hijo
        }
        texto = texto.slice(0, -2) + "."; // Elimina la última coma y espacio
        mostrarResultado(texto);
    }

    // Función para mostrar el texto concatenado
    function mostrarResultado(texto) {
        const outputDiv = document.getElementById("output");
        outputDiv.textContent = texto;
    }

    // Añadimos eventos a cada H2
    document.querySelectorAll("h2").forEach(h2 => {
        h2.addEventListener("click", recorrerAdelante);
    });

}
