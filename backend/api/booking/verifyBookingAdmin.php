<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once __DIR__ . "/../../config.php";

$data = json_decode(file_get_contents("php://input"), true);
$booking_id = $data['booking_id'] ?? null;

if (!$booking_id) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing booking_id"
    ]);
    exit;
}
$stmt = $conn->prepare(
    "UPDATE bookings SET status = 'verified' WHERE booking_id = ?"
);
$stmt->bind_param("i", $booking_id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to verify booking"
    ]);
}

$stmt->close();
$conn->close();
