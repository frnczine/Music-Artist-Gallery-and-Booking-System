<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once __DIR__ . "/../../config.php";
$data = json_decode(file_get_contents("php://input"), true);

//accepts booking (Artist side)
if (!isset($data['booking_id'])) {
    echo json_encode(["success" => false, "message" => "Missing booking_id"]);
    exit;
}
$booking_id = (int)$data['booking_id'];

$stmt = $conn->prepare(
    "UPDATE bookings SET status = 'approved' WHERE booking_id = ?"
);
$stmt->bind_param("i", $booking_id);

echo json_encode(["success" => $stmt->execute()]);
