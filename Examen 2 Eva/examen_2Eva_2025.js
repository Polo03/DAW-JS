class GastosIngresos {
    // Constructor para inicializar el objeto
    constructor(id, ingresoGasto, valor, descripcion, fecha, idConcepto) {
      this.id = id;
      this.ingresoGasto = ingresoGasto;
      this.valor = valor;
      this.descripcion = descripcion;
      this.fecha = fecha;
      this.idConcepto = idConcepto;
    }
}

let conceptosMap = {};  // Mapa para almacenar los conceptos por su ID
let index = 0;
window.onload = function(){
    var rango = document.getElementById("n_filas");

    var output = document.getElementById("output");

    var resultadoDiv = document.getElementById("contenido");

    var paginacion = document.getElementById("paginacion");

    var botonAtras = document.getElementById("atras");

    var botonAdelante = document.getElementById("adelante");

    var gastosIngresos=[];

    var gastosIngresosAPaginar=[];

    

    var numero = 0;

    cargarConceptos();

    
    rango.addEventListener("change", actualizarTabla);
    botonAtras.addEventListener("click", cambioAtras);
    botonAdelante.addEventListener("click", cambioAdelante);

    //Aqui recogemos la peticion AJAX
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'GastosObtenerTodos.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200 && this.readyState == 4) {
            var response = JSON.parse(xhr.responseText);
            //Lo guardamos en un objeto gastosIngresos
            gastosIngresos = response.map(item => 
                new GastosIngresos(item.Id, item.Ingreso_gasto, item.Valor, item.Descripcion, item.Fecha, item.Id_concepto)
            );
        }
    }

    xhr.onerror = function() {
        resultadoDiv.innerHTML = '<p>Hubo un error al procesar la solicitud.</p>';
    };

    xhr.send();
    

    
    
    function actualizarTabla(){
        
        output.innerHTML=rango.value;
        paginacion.style.display = 'block';

        resultadoDiv.innerHTML = '';
        var tabla = document.createElement('table');
        tabla.id = 'tablaResultados';
        var thead = document.createElement('thead');
        var trHead = document.createElement('tr');
        //Creamos la cabecera de la tabla
        ['ID', 'Operación', 'Valor', 'Descripción', 'Fecha', 'Concepto'].forEach(texto => {
            var th = document.createElement('th');
            th.textContent = texto;
            trHead.appendChild(th);
        });
        thead.appendChild(trHead);
        tabla.appendChild(thead);
        var tbody = document.createElement('tbody');
        var tr = document.createElement('tr');
        gastosIngresosAPaginar=[];
        console.log(index);
        //Guardamos los elementos para paginar
        if(index<=0){
            botonAtras.style.display = 'none';
            for(i=index;i< rango.value;i++){
                gastosIngresosAPaginar.push(gastosIngresos[i]);
            }
        }else{
            botonAtras.style.display = 'block';
            numero = Number.parseFloat(rango.value);
            let hasta= index+Number.parseFloat(numero)
            if(hasta>=29){
                botonAdelante.style.display = 'none';
                for(i=index;i<29;i++){
                    gastosIngresosAPaginar.push(gastosIngresos[i-1]);
                }
            }else{
                botonAdelante.style.display = 'block';
                for(i=index+1;i<hasta+1;i++){
                    gastosIngresosAPaginar.push(gastosIngresos[i-1]);
                }
            }
                
            
        }

        //Mostramos el contenido de la tabla
        for(i=0;i<gastosIngresosAPaginar.length;i++){
            // Reemplazar el idConcepto por el nombre del concepto
            var conceptoNombre = conceptosMap[gastosIngresosAPaginar[i].idConcepto] || 'Desconocido';
            var tr = document.createElement('tr');
            [gastosIngresosAPaginar[i].id, gastosIngresosAPaginar[i].ingresoGasto, gastosIngresosAPaginar[i].valor, gastosIngresosAPaginar[i].descripcion, gastosIngresosAPaginar[i].fecha, conceptoNombre].forEach(valor => {
                var td = document.createElement('td');
                td.textContent = valor;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);

        }
        
        tbody.appendChild(tr);

        thead.appendChild(trHead);
        tabla.appendChild(thead);
        tabla.appendChild(tbody);
        resultadoDiv.appendChild(tabla);
        
    }

    //Par ir para atras
    function cambioAtras(){
        console.log(gastosIngresosAPaginar[0]);
        gastosIngresos.forEach((element, key) => {
            console.log(element);
            if(element.id == gastosIngresosAPaginar[0].id){
                index=key-numero;
            }
        });
        console.log(index) 
        actualizarTabla();
    }

    //Para ir para adelante
    function cambioAdelante(){
        gastosIngresos.forEach((element, key) => {
            if(element.id == gastosIngresosAPaginar[gastosIngresosAPaginar.length-1].id)
                index=key+1;
        });
        
        actualizarTabla();
    }
    
};

//Cargamos los conceptos para poder mostrar el nombres en vez del id
function cargarConceptos() {
    fetch('ConceptosObtenerTodos.php')
        .then(response => response.json())
        .then(data => {

            data.forEach(concepto => {
                // Almacenar cada concepto en el mapa
                conceptosMap[concepto.id] = concepto.nombre;
            });
        })
        .catch(error => console.error('Error cargando conceptos:', error));
}