<?php
header('Content-Type: application/json');

// Aquí iría la lógica para conectar a la base de datos y obtener los datos reales de los autobuses
// Simular datos de autobuses
$buses = [
    ["id" => 1, "lat" => -12.05, "lng" => -77.03, "arrivalTime" => "5 min"],
    ["id" => 2, "lat" => -12.07, "lng" => -77.04, "arrivalTime" => "10 min"],
    // Añadir más autobuses según sea necesario
];

echo json_encode(["buses" => $buses]);
?>
