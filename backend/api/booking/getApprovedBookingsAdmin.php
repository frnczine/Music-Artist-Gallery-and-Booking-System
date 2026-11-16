<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "../../config.php";

//Admin fetches the Artists' approved bookings.
$sql = "
SELECT 
  b.booking_id,
  b.date,
  b.time,
  b.place,
  b.status,
  CONCAT(r.FirstName, ' ', r.LastName) AS client_name,
  a.name AS artist_name
FROM bookings b
JOIN registration r ON b.user_id = r.user_id
JOIN artist a ON b.artist_id = a.artist_id
WHERE b.status = 'approved'
";


$result = $conn->query($sql);

$bookings = [];

while ($row = $result->fetch_assoc()) {
    $bookings[] = $row;
}

echo json_encode($bookings);
