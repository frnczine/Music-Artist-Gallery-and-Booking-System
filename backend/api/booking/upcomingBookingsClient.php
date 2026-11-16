<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once __DIR__ . "/../../config.php";

if (!isset($_GET['client_id'])) {
    echo json_encode([]);
    exit;
}

$client_id = (int) $_GET['client_id'];

//Fetch the upcoming verified bookings to show on client side
$sql = "
SELECT 
    b.booking_id,
    b.date,
    b.time,
    b.end_time,
    b.place,
    b.status,
    a.name AS artist_name
FROM bookings b
JOIN artist a ON b.artist_id = a.artist_id
WHERE b.user_id = ?          
  AND b.status = 'verified'  
  AND b.date >= CURDATE()    
ORDER BY b.date ASC, b.time ASC
";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $client_id);
$stmt->execute();
$result = $stmt->get_result();

$bookings = [];
while ($row = $result->fetch_assoc()) {
    $bookings[] = $row;
}

echo json_encode($bookings);
$conn->close();
?>
