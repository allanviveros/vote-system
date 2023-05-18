<?php

//hacer conexion a la base de datos
function GetConection()
{
    $hostnameStr = "127.0.0.1";
    $user = "root";
    $password = "";
    $dbName = "vote";

    $conn = mysqli_connect($hostnameStr, $user, $password, $dbName);

    if (!$conn) {
        echo "Error: No se pudo conectar a MySQL." . PHP_EOL;
        echo "errno de depuración: " . mysqli_connect_errno() . PHP_EOL;
        echo "error de depuración: " . mysqli_connect_error() . PHP_EOL . "<br>";

        exit;
    }

    #echo "Éxito: Se realizó una conexión apropiada a MySQL!";
    return $conn;
}

//cerrar la conexion de la bd
function CloseDb($conn)
{
    mysqli_close($conn);
}

//devuelve solo 1 fila de una query select
function ExecuteSql($sqlQuery)
{
    $db = GetConection();
    $result = mysqli_query($db, $sqlQuery);
    $resultArray = $result->fetch_array(MYSQLI_ASSOC);
    CloseDb($db);
    return json_encode($resultArray);
}

//devuelve todas las filas de una query select
function ExecuteSqlToArray($sqlQuery)
{
    $db = GetConection();
    $result = mysqli_query($db, $sqlQuery);
    $resultArray = $result->fetch_all(MYSQLI_ASSOC);
    CloseDb($db);
    return json_encode($resultArray);
}

//insertar voto en la base de datos
function InsertVoteInDb($sqlQuery)
{
    $db = GetConection();
    $result = mysqli_query($db, $sqlQuery);
    if ($result) {
        $resultArray = ["status"=>0, "msg" => "voto guardado con exito"];
    } else {
        $resultArray = ["status"=>-1, "msg" => "error, el voto no se pudo guardar"];
    }
    CloseDb($db);
    return $resultArray;
}
?>