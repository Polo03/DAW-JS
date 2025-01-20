window.onload = function(){
    const parrafos = document.getElementsByTagName("p");
    function cambiarTextos() {
        for (let i = 0; i < parrafos.length; i++) {
            parrafos[i].textContent = `Texto cambiado del párrafo ${i + 1}`;
        }
    }

    function cambiarClases() {
        for (let i = 0; i < parrafos.length; i++) {
            parrafos[i].classList.add("miClase");
        }
    }

    function quitarClases() {
        for (let i = 0; i < parrafos.length; i++) {
            parrafos[i].classList.remove("miClase");
        }
    }

    document.getElementById("cambiarTextos").addEventListener("click", cambiarTextos);
    document.getElementById("cambiarClases").addEventListener("click", cambiarClases);
    document.getElementById("quitarClases").addEventListener("click", quitarClases);
}
