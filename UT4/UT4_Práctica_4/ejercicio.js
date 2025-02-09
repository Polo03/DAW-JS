document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        document.getElementById('fileInput').style.display='none';
        const reader = new FileReader();
        reader.onload = function(e) {
            var contenidoFichero = e.target.result;
            var alumnos = contenidoFichero.split('\r\n');
            var alumnosArrayObject=[];
            alumnos.forEach(alumno => {
                var alumnoObject=new Alumno(alumno, null, false);
                alumnosArrayObject.push(alumnoObject);
            });
            operaConAlumnos(alumnosArrayObject);
        };
        reader.readAsText(file); 
    }
});

function operaConAlumnos(alumnos){
    var indiceAlumno=0;

    const checkboxContainerEleccionCandidatos = document.getElementById('checkboxesEleccionCandidatos');

    alumnos.forEach((alumno,key) => {
        const label = document.createElement('label');
        label.innerHTML = ` 
            <input type="checkbox" value="${alumno.nombre}"> ${alumno.nombre}
        `;
        checkboxContainerEleccionCandidatos.appendChild(label);
        checkboxContainerEleccionCandidatos.appendChild(document.createElement('br'));
    });
    document.getElementById('divEleccionCandidatos').style.display='block';
    document.getElementById('titulo1').style.display='block';
    document.getElementById('mostrarCandidatos').style.display='block';
    document.getElementById('mostrarCandidatos').addEventListener('click', function() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach((candidato,key) => {
            alumnos.forEach((alumno,indice) => {
                if(alumno.nombre==candidato.value){
                    alumno.votos=0;
                    alumno.esCandidato=true;
                }
            });
        });
        var candidatos=[];
        alumnos.forEach((alumno, key) => {
            if(alumno.esCandidato){
                candidatos.push(alumno.nombre);
            }
        });
        var cadena='Los candidatos seleccionados son: ';
        if(candidatos.length<2){
            cadena='Tiene que seleccionar mas de 1 candidato';
        }else{
            candidatos.forEach((candidato, key) => {
                if(key+1==candidatos.length-1)
                    cadena+=candidato+' y ';
                else if(key+1!=candidatos.length)
                    cadena+=candidato+', ';      
                else if(key+1==candidatos.length)
                    cadena+=candidato+".";
            });
        }
        alert(cadena);
        document.getElementById('divEleccionCandidatos').style.display='none';
        document.getElementById('divVotosACandidatos').style.display='block';
        document.getElementById('titulo2').style.display='block';
        document.getElementById('nombreAlumno').style.display='block';
        // Comenzar el proceso de votación
        mostrarSelectParaVoto(indiceAlumno);
    });
    function mostrarSelectParaVoto(indice) {
        const container = document.getElementById('selectContainer');
        container.innerHTML = ''; // Limpiar el contenedor
        if (indice < alumnos.length) {
            const select = document.createElement('select');
            select.id = `select-${indice}`;
    
            // Añadir opciones seleccionadas
            alumnos.forEach(alumno => {
                if(alumno.esCandidato){
                    const optionElement = document.createElement('option');
                    optionElement.value = alumno.nombre;
                    optionElement.textContent = alumno.nombre;
                    select.appendChild(optionElement);
                }
            });
    
            const label = document.createElement('label');
            label.textContent = `Voto de ${alumnos[indice].nombre}: `;
            label.htmlFor = select.id;
    
            const submitButton = document.createElement('button');
            submitButton.textContent = 'Votar';
            submitButton.addEventListener('click', function() {
                const selectedValue = select.value;
                if (!selectedValue) {
                    alert('Por favor, selecciona un candidato.');
                    return;
                }
                alumnos.forEach((alumno, indice) => {
                    if(alumno.nombre==selectedValue){
                        alumno.votos++;
                    }
                        
                });
                // Aumentar el índice y mostrar el siguiente select
                indiceAlumno++;
                mostrarSelectParaVoto(indiceAlumno);
            });
                
            container.appendChild(label);
            container.appendChild(select);
            container.appendChild(submitButton);
            container.appendChild(document.createElement('br'));
        } else {
            alert('Todos los alumnos han votado. ¡Gracias!');
            var delegado='';
            
            function calculaMaximo(numeros) {
                if (numeros.length === 0) {
                    return null; // Retorna null si el array está vacío
                }
                
                let maximo = numeros[0]; // Suponemos que el primer elemento es el máximo
                
                for (let i = 1; i < numeros.length; i++) {
                    if (numeros[i] > maximo) {
                        maximo = numeros[i]; // Actualizamos el máximo si encontramos un número mayor
                    }
                }
                
                return maximo;
            }
            var votos=[];
            alumnos.forEach((alumno, key) => {
                if(alumno.esCandidato){
                    votos.push(alumno.votos);
                }
            });
            // Ejemplo de uso
            const resultado = calculaMaximo(votos);
            document.getElementById('titulo2').style.display='none';
            var cadena='Los votos son: <br>';
            for(var i=0;i<votos.length;i++){
                    alumnos.forEach((alumno, key) => {
                        if(alumno.votos==resultado){
                            delegado=alumno.nombre;
                        }
                    });
                 
            }
            alumnos.forEach((alumno, key) => {
                if(alumno.esCandidato){
                    cadena+= alumno.nombre+' -> '+alumno.votos+' votos. <br>';
                }
            });
            
            cadena+='El delegado es: '+delegado;
            document.getElementById('result').innerHTML=cadena;
            
        }
    }
    
}

class Alumno{
    constructor(nombre, votos, esCandidato) {
        this.nombre=nombre;
        this.votos=votos;
        this.esCandidato=esCandidato;
      }
    
}
