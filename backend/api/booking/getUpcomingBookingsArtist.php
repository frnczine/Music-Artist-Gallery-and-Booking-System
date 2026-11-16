<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once __DIR__ . "/../../config.php";

if (!isset($_GET['artist_id'])) {
    echo json_encode([]);
    exit;
}
//fetch the upcoming bookings details for specific artist (that are already approved/verified by the admin)
$artist_id = (int) $_GET['artist_id'];

$sql = "
SELECT 
    b.booking_id,
    b.date,
    b.time,
    b.end_time,
    b.place,
    b.status,
    CONCAT(r.FirstName, ' ', r.LastName) AS client_name
FROM bookings b
JOIN registration r ON b.user_id = r.user_id
WHERE b.artist_id = ?
  AND b.status = 'verified'
ORDER BY b.date ASC, b.time ASC
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $artist_id);
$stmt->execute();
$result = $stmt->get_result();

$bookings = [];
while ($row = $result->fetch_assoc()) {
    $bookings[] = $row;
}
echo json_encode($bookings);
$conn->close();
