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

window.onload = function() {

  // Obtener el botón "Consultar"
  var btnConsultar = document.getElementById('btnConsultar');

  // Obtener los checkboxes de ingreso y gasto
  var ingresoCheckbox = document.getElementById('ingreso');
  var gastoCheckbox = document.getElementById('gasto');

  // Obtener el contenedor de los checkboxes
  var checkboxesDiv = document.getElementById('checkboxes');

  // Obtener el div de resultados
  var resultadoDiv = document.getElementById('resultado');

  // Event listener para el botón "Consultar"
  btnConsultar.addEventListener('click', function() {
      this.disabled = true;
      // Mostrar los checkboxes para seleccionar Ingresos o Gastos
      checkboxesDiv.style.display = 'block';
  });

  // Event listener para los cambios en los checkboxes
  ingresoCheckbox.addEventListener('change', actualizarTabla);
  gastoCheckbox.addEventListener('change', actualizarTabla);

  // Función para obtener y actualizar los datos según los checkboxes seleccionados
  function actualizarTabla() {
      // Crear un array con los tipos seleccionados
      var tiposSeleccionados = [];

      if (ingresoCheckbox.checked) {
          tiposSeleccionados.push('Ingreso');
      }
      if (gastoCheckbox.checked) {
          tiposSeleccionados.push('Gasto');
      }

      // Si no se selecciona ningún tipo, limpiar los resultados
      if (tiposSeleccionados.length === 0) {
          resultadoDiv.innerHTML = '';  // Limpiar los resultados
          return;
      }

      // Realizar la solicitud AJAX para obtener los datos
      obtenerDatos(tiposSeleccionados);
  }

  // Función para realizar la solicitud AJAX
  function obtenerDatos(tiposSeleccionados) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'GastosObtenerTodos.php', true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = function() {
          if (xhr.status === 200 && this.readyState == 4) {
              var response = JSON.parse(xhr.responseText);
              
              // Convertimos response en un array de objetos GastosIngresos
            let gastosIngresos = response.map(item => 
                new GastosIngresos(item.Id, item.Ingreso_gasto, item.Valor, item.Descripcion, item.Fecha, item.Id_concepto)
            );
              // Limpiar los resultados anteriores
              resultadoDiv.innerHTML = '';

              if (gastosIngresos) {
                
                  // Crear una tabla con los resultados
                  var tablaHTML = '<table id="tablaResultados">';
                  tablaHTML += '<thead><tr><th>ID</th><th>Operación</th><th>Valor</th><th>Descripción</th><th>Fecha</th><th>Concepto</th></tr></thead><tbody>';

                  gastosIngresos.forEach(function(item) {
                      tiposSeleccionados.forEach(function(tipo){
                        if(item.ingresoGasto == tipo){
                          tablaHTML += `<tr><td>${item.id}</td><td>${item.ingresoGasto}</td><td>${item.valor}</td><td>${item.descripcion}</td><td>${item.fecha}</td></td><td>${item.idConcepto}</td></tr>`;
                        }
                      });
                  });

                  tablaHTML += '</tbody></table>';

                  // Mostrar los resultados en el div de resultados
                  resultadoDiv.innerHTML = tablaHTML;
              } else {
                  // Si no se encontraron resultados
                  resultadoDiv.innerHTML = '<p>No se encontraron resultados.</p>';
              }
          } else {
              // Si hubo un error en la solicitud
              resultadoDiv.innerHTML = '<p>Error al realizar la consulta.</p>';
          }
      };

      xhr.onerror = function() {
          resultadoDiv.innerHTML = '<p>Hubo un error al procesar la solicitud.</p>';
      };

      xhr.send();
  }
};
