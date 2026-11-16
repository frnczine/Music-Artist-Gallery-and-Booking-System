<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include "../config.php";

$data = json_decode(file_get_contents("php://input"), true);
$username = $data["username"] ?? "";

if (!$username) {
    echo json_encode(["status" => "error", "message" => "Missing username"]);
    exit;
}
//update verification status as verified (artist profile verification badge)
$stmt = $conn->prepare("UPDATE verification SET Status='Verified' WHERE Username=?");
$stmt->bind_param("s", $username);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
