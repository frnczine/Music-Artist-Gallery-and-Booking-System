<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once __DIR__ . "/../../config.php";
$data = json_decode(file_get_contents("php://input"), true);

//createBooking (triggered by clients' "Book now")
if (
    !isset($data['user_id']) ||
    !isset($data['artist_id']) ||
    !isset($data['date']) ||
    !isset($data['time']) ||
    !isset($data['end_time']) ||
    !isset($data['place'])
) {
    echo json_encode([
        "success" => false,
        "message" => "Missing required fields"
    ]);
    exit;
}
$user_id   = (int)$data['user_id'];
$artist_id = (int)$data['artist_id'];
$date      = $data['date'];
$time      = $data['time'];
$end_time  = $data['end_time'];
$place     = $data['place'];

$sql = "INSERT INTO bookings 
        (user_id, artist_id, date, time, end_time, place, status)
        VALUES (?, ?, ?, ?, ?, ?, 'pending')";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "SQL prepare failed"
    ]);
    exit;
}
$stmt->bind_param(
    "iissss",
    $user_id,
    $artist_id,
    $date,
    $time,
    $end_time,
    $place
);
if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Insert failed"
    ]);
}
$stmt->close();
$conn->close();
