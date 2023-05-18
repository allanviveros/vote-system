<?php
/* Archivo de rutas para guardar el voto */

# Ruta de ejemplo
#http://127.0.0.1/vote/backend/routes/vote.php

//Cabeceras
//header('Content-Type: application/json');
//header("Access-Control-Allow-Origin: *");


header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");


require("../controllers/PostVote.php");


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $register = ValidateRut($data);
    echo json_encode($register);
}

// valida si el usuario ya voto (a partir del rut), si no ha votado lo guarda en la bd
function ValidateRut($data)
{
    $rutUser = $data["rut"];

    $voteInDb = SearchVoteByRut($rutUser);


    if ($voteInDb == "null") {
        return InsertVote($data);
    } else {
        return ["status" => -1, "msg" => "el usuario ya voto"];
    }

}

?>