<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../config.php";

//Retrieval of verification status and genre of a user based on ID
$username = $_GET["username"] ?? "";
if (!$username) {
    echo json_encode(["status" => "error", "message" => "Missing username"]);
    exit;
}
$sql = "SELECT * FROM verification WHERE Username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$res = $stmt->get_result();

if ($res->num_rows === 0) {
    echo json_encode(["status" => "none"]);
    exit;
}

$data = $res->fetch_assoc();

echo json_encode([
    "status" => strtolower($data["Status"]),
    "genre" => $data["Genre"]
]);
