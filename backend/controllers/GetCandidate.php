<?php

include_once("../config/db.php");

//obtener todos los candidatos de la base de datos
function GetCandidate()
{
    $sqlQuery = "SELECT * FROM candidates";
    echo ExecuteSqlToArray($sqlQuery);
}
?>