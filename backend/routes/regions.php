<?php
/* Archivo de rutas para obtener todas las regiones */

# Ruta de ejemplo
#http://127.0.0.1/vote/backend/routes/regions.php

//Cabeceras
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

require("../controllers/GetRegions.php");

GetRegions();
?>