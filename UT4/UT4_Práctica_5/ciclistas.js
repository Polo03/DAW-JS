document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            var contenidoFichero = e.target.result;
            var ciclistas = contenidoFichero.split('\r\n');
            var ciclistasArray=[];
            ciclistas.forEach(ciclista => {
                var ciclistasBien=ciclista.split(",");
                var ciclistaObj=new Ciclista(ciclistasBien[0], ciclistasBien[1], 
                    ciclistasBien[2], (10.8 * ciclistasBien[2] / ciclistasBien[1] )+ 7);
                ciclistasArray.push(ciclistaObj);
            });
            operaConCiclistas(ciclistasArray);
        };
        reader.readAsText(file); 
    }
});

function operaConCiclistas(ciclistas){
  
  // Índice que lleva el seguimiento del elemento que se está mostrando
  let indice = 0;
  
  // Referencias a los elementos HTML
  const siguienteButton = document.getElementById("siguiente");
  const anteriorButton = document.getElementById("anterior");
  const nombreCiclista=document.getElementById("nombreCiclista");
  const pesoCiclista=document.getElementById("pesoCiclista");
  const potenciaCiclista=document.getElementById("potenciaCiclista");
  const VO2MaxCiclista=document.getElementById("vo2maxCiclista");

  // Función para mostrar el siguiente dato
  function mostrarSiguienteDato() {
    nombreCiclista.value=ciclistas[indice].nombre;
    pesoCiclista.value=ciclistas[indice].peso;
    potenciaCiclista.value=ciclistas[indice].potencia;
    VO2MaxCiclista.value=ciclistas[indice].VO2Max;
    if (indice == ciclistas.length-1) 
      indice=0;
    else
        indice++;
  }
  
  // Añadir el evento de click al botón
  siguienteButton.addEventListener("click", mostrarSiguienteDato);
  
  // Mostrar el primer dato al cargar la página
  mostrarSiguienteDato();
}

class Ciclista{
    constructor(nombre, peso, potencia, VO2Max) {
        this.nombre=nombre;
        this.peso=peso;
        this.potencia=potencia;
        this.VO2Max=VO2Max;
    }
    
}