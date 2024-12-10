window.onload = function() {
    //Definimos variables
    let currentIndex = 0; 
    var alumnosMostrarSelect=[];

    //Cargamos todos los elementos del DOM
    const nombreInput=document.getElementById('nombre');
    const apellidosInput=document.getElementById('apellidos');
    const expedienteInput=document.getElementById('expediente');
    const faltasInput=document.getElementById('faltas');
    const porcentajeInput=document.getElementById('porcentaje');
    const restaInput=document.getElementById('resta');
    const container = document.getElementById('datos');

    //Creamos una funcion para que cargue los alumnos en el select
    function cargarAlumnos(){
        document.getElementById('file-input').addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    var contenidoFichero = e.target.result;
                    var alumnos = contenidoFichero.split('\n');
                    //Recorremos todos los alumnos recogidos del fichero
                    alumnos.forEach((alumno,key) => {
                        if(key>=1){
                            alumnoDividido=alumno.split('|');
                            //Guardamos en un objeto ese alumno recogido del fichero
                            var alumnoObject=new Alumno(alumnoDividido[0], alumnoDividido[1], alumnoDividido[2], alumnoDividido[4]);
                            //Y lo guardamos el array para mostrar los alumnos en el select
                            alumnosMostrarSelect.push(alumnoObject);
                        }
                    });
                    //Cargamos todos los alumnos a mostrar en el select para mostrarlos
                    alumnosMostrarSelect.forEach((alumno,key) => {
                        const optionElement = document.createElement('option');
                        optionElement.value = key;
                        optionElement.textContent = alumno.nombre + ' ' + alumno.apellido;
                        container.appendChild(optionElement); 
                    });
                };
                reader.readAsText(file); 
            }
        });
    }
    //Llamamos a la funcion cargarAlumnos() para poder ver los alumnos en el select, para seleccionar los que quiera el usuario. 
    cargarAlumnos();
    //Creamos evento para el botón siguiente
    document.getElementById('siguiente').addEventListener('click', function() {
        //Hacemos que cuando le de al botón, se guarden los elementos seleccionados en un array. En este caso guardamos 
        //el objeto entero para poder acceder a todos sus metodos.
        const opcionesSeleccionadas = Array.from(container.selectedOptions).map(option => alumnosMostrarSelect[option.value]);
        // Si no ha seleccionado ningun elemento, te muestra una alerta y no sigue con el codigo siguiente.
        if (opcionesSeleccionadas.length === 0) {
            alert('Por favor, seleccione al menos una opción.');
            return;
        }
        //Guardamos el alumno correspondiente de cuando le toque a cada uno con el currentIndex, ya que los valores seleccionados
        //estan guardados en un array, pero nos da un objeto.
        const alumno = opcionesSeleccionadas[currentIndex];
        //Mostramos los datos de todos los campos necesarios en los inputs.
        nombreInput.value=alumno.getNombre;
        apellidosInput.value=alumno.getApellido;
        expedienteInput.value=alumno.getExpediente;
        faltasInput.value=alumno.getFaltas;
        porcentajeInput.value=alumno.getPorcentajeFaltas+"%";
        restaInput.value=alumno.getResta;

        // Avanzar al siguiente índice, o volver al inicio si estamos al final
        currentIndex = (currentIndex + 1) % opcionesSeleccionadas.length;
        
    });
    
    //Creamos la clase Alumno, con sus getters y setters, para poder acceder a sus metodos.
    class Alumno{
        constructor(nombre, apellido, expediente, faltas) {
            this.nombre=nombre;
            this.apellido=apellido;
            this.expediente=expediente;
            this.faltas=faltas;
        }

        get getNombre(){
            return this.nombre;
        }
        
        get getApellido(){
            return this.apellido;
        }

        get getExpediente(){
            return this.expediente;
        }

        get getFaltas(){
            return this.faltas;
        }
        
        get getPorcentajeFaltas(){
            return ((this.faltas * 100) / 115).toFixed(2);
        }

        get getResta(){
            const totalHoras = 115; // Total de horas base
            const porcentajePermitido = 0.15; // 15% en decimal
            const horasPermitidas = totalHoras * porcentajePermitido;
            const faltasRestantes=Math.round(parseFloat((horasPermitidas - this.faltas).toFixed(2)));
            if(faltasRestantes<0)
                return 0;
            else
                return faltasRestantes;
        }
        
    }
    

}
