<?php

include_once("../config/db.php");

//obtener todas las comunas asociadas a una region (idRegion: id de la region)
function GetCommunes($idRegion)
{
    $sqlQuery = "SELECT * FROM communes WHERE id_regions=" . $idRegion;
    echo ExecuteSqlToArray($sqlQuery);

}
?>