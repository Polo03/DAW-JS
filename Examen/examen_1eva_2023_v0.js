window.onload = function() {

    document.getElementById('file-input').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                var contenidoFichero = e.target.result;
                var alumnosObjectArray=[];
                var alumnos = contenidoFichero.split('\n');
                alumnos.forEach((alumno,key) => {
                    if(key>=1){
                        alumnoDividido=alumno.split('|');
                        var alumnoObject=new Alumno(alumnoDividido[0], alumnoDividido[1], alumnoDividido[2], alumnoDividido[4]);
                        alumnosObjectArray.push(alumnoObject);
                    }
                });
                operaConAlumnos(alumnosObjectArray);
            };
            reader.readAsText(file); 
        }
    });
    
    function operaConAlumnos(alumnos){
        const container = document.getElementById('datos');
        container.innerHTML = ''; // Limpiar el contenedor
        alumnos.forEach((alumno,key) => {
            const optionElement = document.createElement('option');
            optionElement.value = alumno.nombre + ' ' + alumno.apellido;
            optionElement.textContent = alumno.nombre + ' ' + alumno.apellido;
            container.appendChild(optionElement); 
        });
        document.getElementById('siguiente').addEventListener('click', function(event) {
            var alumnosMostrarDatos=[];
            var seleccionados = Array.from(container.selectedOptions); // Convierte la colección en un array
            
            // Extraer los valores seleccionados
            var valoresSeleccionados = seleccionados.map(function(opcion) {
                return opcion.value;
            });
            valoresSeleccionados.forEach((valor,key) => {
                alumnos.forEach(alumno => {
                    if(valor.split(' ')[0]==alumno.nombre)
                        alumnosMostrarDatos.push(alumno);
                });
            });
            muestraDatosAlumnos(alumnosMostrarDatos);
        });
        
    }
    function muestraDatosAlumnos(alumnos){ 
        let indice = 0;
    
        // Referencias a los elementos HTML
        const siguienteButton = document.getElementById("siguiente");
        const nombre = document.getElementById("nombre");
        const apellidos=document.getElementById("apellidos");
        const expediente=document.getElementById("expediente");
        const faltas=document.getElementById("faltas");
        const porcentaje=document.getElementById("porcentaje"); 
        const resta=document.getElementById("resta");

        // Función para mostrar el siguiente dato
        function mostrarSiguienteDato() {
            nombre.value=alumnos[indice].nombre;
            apellidos.value=alumnos[indice].apellido;
            expediente.value=alumnos[indice].expediente;
            faltas.value=alumnos[indice].faltas;
            porcentaje.value=(alumnos[indice].faltas * 100) / 115 + '%';
            resta.value=(115*0,15) - alumnos[indice].faltas;

            if (indice == alumnos.length-1) 
                indice=0;
            else
                indice++;
        }
       
        // Añadir el evento de click al botón
        siguienteButton.addEventListener("click", mostrarSiguienteDato);
       
        // Mostrar el primer dato al cargar la página
        mostrarSiguienteDato();
    }
    
    
    class Alumno{
        constructor(nombre, apellido, expediente, faltas) {
            this.nombre=nombre;
            this.apellido=apellido;
            this.expediente=expediente;
            this.faltas=faltas;
        }
        
    }
    

}
