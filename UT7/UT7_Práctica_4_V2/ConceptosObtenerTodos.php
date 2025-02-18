<?php

require_once "_com/DAO_contabilidad.php";

$resultado = DAO::conceptoObtenerTodos();

echo json_encode($resultado);