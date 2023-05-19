<?php

include_once("../config/db.php");

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

//busca si el usuario ya voto a partir del rut
function SearchVoteByRut($rut)
{

    $sqlQuery = "SELECT * FROM vote WHERE rut='" . $rut . "'";
    return ExecuteSql($sqlQuery);
}

//insertar el voto a la bd
function InsertVote($form)
{
    $sqlQuery = "Insert into vote (id_regions,id_communes, id_candidates,name,alias,rut,email,media) 
    values " . generateSqlVote($form);

    $answerDb = InsertVoteInDb($sqlQuery);

    return $answerDb;
}

// toma el formulario y lo vuelve una sentencia de sql
function generateSqlVote($form)
{
    $strFinal = "(" . $form["id_regions"] . "," .
        $form["id_communes"] . "," . $form["id_candidates"] . ",";
    $strFinal = $strFinal . "'" . $form["name"] . "'" . ",";
    $strFinal = $strFinal . "'" . $form["alias"] . "'" . ",";
    $strFinal = $strFinal . "'" . $form["rut"] . "'" . ",";
    $strFinal = $strFinal . "'" . $form["email"] . "'" . ",";
    $strFinal = $strFinal . "'" . $form["media"] . "'" . ")";
    return $strFinal;
}

?>