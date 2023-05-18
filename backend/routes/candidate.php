<?php
/* Archivo de rutas para obtener todos los candidatos */

# Ruta de ejemplo
#http://127.0.0.1/vote/backend/routes/candidate.php

//Cabeceras
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

require("../controllers/GetCandidate.php");


GetCandidate();
?>