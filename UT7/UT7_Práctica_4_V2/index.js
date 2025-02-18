class GastosIngresos {
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

window.onload = function() {
    var btnConsultar = document.getElementById('btnConsultar');
    var ingresoCheckbox = document.getElementById('ingreso');
    var gastoCheckbox = document.getElementById('gasto');
    var mayorQueCeroRadio = document.getElementById('mayorQueCero');
    var fechaFiltro = document.getElementById('fechaFiltro');  // Capturar el input de fecha
    var checkboxesDiv = document.getElementById('checkboxes');
    var resultadoDiv = document.getElementById('resultado');
    var select = document.getElementById('conceptosSelect');

    let radioSeleccionado = false;  // Estado del radio button

    btnConsultar.addEventListener('click', function() {
        this.disabled = true;
        checkboxesDiv.style.display = 'block';
    });

    cargarConceptos();  // Cargar conceptos en la página
    
    ingresoCheckbox.addEventListener('change', actualizarTabla);
    gastoCheckbox.addEventListener('change', actualizarTabla);
    select.addEventListener('change', actualizarTabla);
    fechaFiltro.addEventListener('change', actualizarTabla);  // Evento para cambio de fecha

    // Permitir activar y desactivar el radio button
    mayorQueCeroRadio.addEventListener('click', function() {
        if (radioSeleccionado) {
            mayorQueCeroRadio.checked = false; 
        }
        radioSeleccionado = mayorQueCeroRadio.checked;
        actualizarTabla();
    });

    function actualizarTabla() {
        var tiposSeleccionados = [];
        if (ingresoCheckbox.checked) tiposSeleccionados.push('Ingreso');
        if (gastoCheckbox.checked) tiposSeleccionados.push('Gasto');
    
        if (tiposSeleccionados.length === 0) {
            resultadoDiv.innerHTML = '';  
            return;
        }

        let valoresSeleccionados = Array.from(select.selectedOptions).map(option => option.value);
    
        // Si la opción por defecto está seleccionada, ignorar los filtros por concepto
        if (valoresSeleccionados.includes("")) {
            valoresSeleccionados = []; // Esto hará que obtenerId devuelva todos los conceptos
        }

        var fechaSeleccionada = fechaFiltro.value;  // Obtener la fecha seleccionada

        obtenerDatos(tiposSeleccionados, valoresSeleccionados, fechaSeleccionada);  // Pasar la fecha al obtener datos
    }

    function obtenerDatos(tiposSeleccionados, valoresSeleccionados, fechaSeleccionada) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'GastosObtenerTodos.php?tipos=' + JSON.stringify(tiposSeleccionados), true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                let gastosIngresos = response.map(item => 
                    new GastosIngresos(item.Id, item.Ingreso_gasto, item.Valor, item.Descripcion, item.Fecha, item.Id_concepto)
                );

                resultadoDiv.innerHTML = '';

                if (gastosIngresos.length === 0) return;

                var tabla = document.createElement('table');
                tabla.id = 'tablaResultados';

                var thead = document.createElement('thead');
                var trHead = document.createElement('tr');
                ['ID', 'Operación', 'Valor', 'Descripción', 'Fecha', 'Concepto'].forEach(texto => {
                    var th = document.createElement('th');
                    th.textContent = texto;
                    trHead.appendChild(th);
                });
                thead.appendChild(trHead);
                tabla.appendChild(thead);

                var tbody = document.createElement('tbody');
                let promesas = gastosIngresos.flatMap(item => 
                    tiposSeleccionados.map(tipo => {
                        if (item.ingresoGasto === tipo) {
                            return obtenerId(valoresSeleccionados).then(conceptos => { 
                                conceptos.forEach(concepto => {
                                    // Filtrar por la fecha seleccionada
                                    if ((concepto == item.idConcepto || concepto == null) && 
                                        (!radioSeleccionado || item.valor > 0) && 
                                        (!fechaSeleccionada || item.fecha === fechaSeleccionada)) {
                                        var tr = document.createElement('tr');
                                        // Reemplazar el idConcepto por el nombre del concepto
                                        var conceptoNombre = conceptosMap[item.idConcepto] || 'Desconocido';
                                        [item.id, item.ingresoGasto, item.valor, item.descripcion, item.fecha, conceptoNombre].forEach(valor => {
                                            var td = document.createElement('td');
                                            td.textContent = valor;
                                            tr.appendChild(td);
                                        });
                                        tbody.appendChild(tr);
                                    }
                                });
                            });
                        }
                    })
                );

                Promise.all(promesas).then(() => {
                    if (tbody.children.length > 0) {
                        tabla.appendChild(tbody);
                        resultadoDiv.appendChild(tabla);
                    }
                });

            } else {
                resultadoDiv.innerHTML = '<p>Error al realizar la consulta.</p>';
            }
        };

        xhr.onerror = function() {
            resultadoDiv.innerHTML = '<p>Hubo un error al procesar la solicitud.</p>';
        };

        xhr.send();
    }
};

function cargarConceptos() {
    fetch('ConceptosObtenerTodos.php')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('conceptosSelect');
            select.innerHTML = '<option value="">Seleccione un concepto</option>';
            data.forEach(concepto => {
                const option = document.createElement('option');
                option.value = concepto.id;
                option.textContent = concepto.nombre;
                select.appendChild(option);

                // Almacenar cada concepto en el mapa
                conceptosMap[concepto.id] = concepto.nombre;
            });
        })
        .catch(error => console.error('Error cargando conceptos:', error));
}

async function obtenerId(nombreConceptos) {
    console.log(nombreConceptos);
    try {
        let conceptos = [];
        const response = await fetch('ConceptosObtenerTodos.php');
        const data = await response.json();

        // Si no hay conceptos seleccionados o si el valor por defecto está seleccionado
        if (nombreConceptos.length === 0 || nombreConceptos.includes("")) {
            return data.map(dato => dato.id);  // Devuelve todos los conceptos
        }

        // Filtrar solo los conceptos seleccionados
        data.forEach(dato => {
            nombreConceptos.forEach(concepto => {
                if (dato.id == concepto) {
                    conceptos.push(concepto);
                }
            });
        });

        return conceptos;
    } catch (error) {
        console.error('Error cargando conceptos:', error);
        return [];
    }
}
