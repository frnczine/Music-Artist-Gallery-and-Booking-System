<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once __DIR__ . "/../../config.php";

//Fetch pending bookings for specific artist, including client names
if (!isset($_GET['artist_id'])) {
    echo json_encode([]);
    exit;
}

$artist_id = (int)$_GET['artist_id'];
$sql = "
    SELECT 
        bookings.booking_id,
        bookings.date,
        bookings.time,
        bookings.place,
        registration.FirstName,
        registration.LastName
    FROM bookings
    JOIN registration ON bookings.user_id = registration.user_id
    WHERE bookings.status = 'pending'
      AND bookings.artist_id = ?
    ORDER BY bookings.date ASC, bookings.time ASC
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $artist_id);
$stmt->execute();
$result = $stmt->get_result();

$bookings = [];

while ($row = $result->fetch_assoc()) {
    $row['client_name'] = $row['FirstName'] . ' ' . $row['LastName'];
    $bookings[] = $row;
}
echo json_encode($bookings);

$conn->close();
