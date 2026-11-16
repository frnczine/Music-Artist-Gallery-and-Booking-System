<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once __DIR__ . "/../../config.php";
$data = json_decode(file_get_contents("php://input"), true);

//decline booking (Artist side)
if (!isset($data['booking_id'])) {
    echo json_encode([
        "success" => false,
        "message" => "Booking ID missing"
    ]);
    exit;
}
$booking_id = (int)$data['booking_id'];
$sql = "UPDATE bookings SET status = 'rejected' WHERE id = ?";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "SQL prepare failed"
    ]);
    exit;
}
$stmt->bind_param("i", $booking_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Update failed"
    ]);
}
$stmt->close();
$conn->close();
