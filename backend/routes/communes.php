<?php
/* Archivo de rutas para obtener las comunas a partir del id de la region*/

# Ruta de ejemplo
#http://127.0.0.1/vote/backend/routes/communes.php?idregion=1

//Cabeceras
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

require("../controllers/GetCommunes.php");

$idRegion = $_GET["idregion"];
GetCommunes($idRegion);
?>