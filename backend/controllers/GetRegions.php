<?php

include_once("../config/db.php");

//obtener todas las regiones de la base de datos
function GetRegions()
{
    $sqlQuery = "SELECT * FROM regions";
    echo ExecuteSqlToArray($sqlQuery);
}

?>