<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once __DIR__ . "/../../config.php";

//fetch all the verified bookings including client and artist details
$sql = "
SELECT 
    b.booking_id,
    b.date,
    b.time,
    b.end_time,
    b.place,
    b.status,
    CONCAT(r.FirstName, ' ', r.LastName) AS client_name,
    a.name AS artist_name
FROM bookings b
JOIN registration r ON b.user_id = r.user_id
JOIN artist a ON b.artist_id = a.artist_id
WHERE b.status = 'verified'
ORDER BY b.date ASC, b.time ASC
";

$result = $conn->query($sql);

$bookings = [];
while ($row = $result->fetch_assoc()) {
    $bookings[] = $row;
}
echo json_encode($bookings);
$conn->close();
