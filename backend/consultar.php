<?php

require "conexion.php";

$conexion = new Conexion();


extract($_REQUEST);

$sql = "SELECT * FROM demo";

$query = $conexion->query($sql);

$results = $query->fetchAll(PDO::FETCH_ASSOC);

print json_encode($results);