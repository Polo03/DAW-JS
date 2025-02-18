<?php

require_once "_com/DAO_contabilidad.php";

echo json_encode(DAO::gastosObtenerTodos());