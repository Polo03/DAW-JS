class GastosIngresos {
  // Constructor para inicializar el objeto
  constructor(Id, IngresoGasto, Valor, Descripcion, Fecha, IdConcepto) {
      this._Id = Id || null;  // ID del gasto (puede ser null si es un nuevo gasto)
      this._IngresoGasto = IngresoGasto || '';  // 'Ingreso' o 'Gasto'
      this._Valor = Valor || 0.00;  // Monto del gasto o ingreso
      this._Descripcion = Descripcion || '';  // Descripción del gasto
      this._Fecha = Fecha || '';  // Fecha en formato 'YYYY-MM-DD'
      this._IdConcepto = IdConcepto || 0;  // Id del concepto relacionado
  }

  // Getter y Setter para _Id
  get Id() {
      return this._Id;
  }

  set Id(value) {
      this._Id = value;
  }

  // Getter y Setter para _IngresoGasto
  get IngresoGasto() {
      return this._IngresoGasto;
  }

  set IngresoGasto(value) {
      this._IngresoGasto = value;
  }

  // Getter y Setter para _Valor
  get Valor() {
      return this._Valor;
  }

  set Valor(value) {
      if (value >= 0) {
          this._Valor = value;
      } else {
          console.error("El valor debe ser positivo.");
      }
  }

  // Getter y Setter para _Descripcion
  get Descripcion() {
      return this._Descripcion;
  }

  set Descripcion(value) {
      this._Descripcion = value;
  }

  // Getter y Setter para _Fecha
  get Fecha() {
      return this._Fecha;
  }

  set Fecha(value) {
      this._Fecha = value;
  }

  // Getter y Setter para _IdConcepto
  get IdConcepto() {
      return this._IdConcepto;
  }

  set IdConcepto(value) {
      if (Number.isInteger(value) && value > 0) {
          this._IdConcepto = value;
      } else {
          console.error("El Id del concepto debe ser un número entero positivo.");
      }
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
      xhr.open('GET', 'GastosObtenerTodos.php?tipos=' + JSON.stringify(tiposSeleccionados), true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = function() {
          if (xhr.status === 200) {
              var response = JSON.parse(xhr.responseText);
              let gastosIngresos=response.map(item => {
                return new GastosIngresos(
                    item.Id,
                    item.IngresoGasto,
                    item.Valor,
                    item.Descripcion,
                    item.Fecha,
                    item.IdConcepto
                );
              });
              // Limpiar los resultados anteriores
              resultadoDiv.innerHTML = '';

              if (response) {
                
                  // Crear una tabla con los resultados
                  var tablaHTML = '<table id="tablaResultados">';
                  tablaHTML += '<thead><tr><th>ID</th><th>Operación</th><th>Valor</th><th>Descripción</th><th>Fecha</th><th>Concepto</th></tr></thead><tbody>';

                  gastosIngresos.forEach(function(item) {
                      tiposSeleccionados.forEach(function(tipo){
                        if(item.Ingreso_gasto == tipo){
                          tablaHTML += `<tr><td>${item.Id}</td><td>${item.Ingreso_gasto}</td><td>${item.Valor}</td><td>${item.Descripcion}</td><td>${item.Fecha}</td></td><td>${item.Id_concepto}</td></tr>`;
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
