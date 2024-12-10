function inicializar(){
    
    document.getElementById("crear-ventana").onclick=crearNueva;
    document.getElementById("cerrar-ventana").onclick=cerrarNueva;
    var nuevaVentana;
    function crearNueva(){
        // Dimensiones de la nueva ventana
        var width = 1000; // Puedes ajustar este valor
        var height = 600; // Puedes ajustar este valor

        // Dimensiones de la pantalla
        var screenWidth = window.screen.width;
        var screenHeight = window.screen.height;

        // Calcular la posición para centrar la esquina superior izquierda
        var left = (screenWidth / 2);
        var top = (screenHeight / 2);

        // Abrir la nueva ventana
        var nuevaVentana = window.open('https://aulavirtual3.educa.madrid.org/ies.lagunadejoatzel.getafe/', 'AulaVirtual', 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left);

        if (!nuevaVentana) {
            alert("Por favor, permite las ventanas emergentes para esta página.");
        }
    }
    function cerrarNueva(){
        if (nuevaVentana){
            nuevaVentana.close(); 
            nuevaVentana = null;
        }
    }
}