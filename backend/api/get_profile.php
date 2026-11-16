<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

include "../config.php";

if (!isset($_GET['user_id'])) {
    echo json_encode(["error" => "missing user_id"]);
    exit;
}

$user_id = intval($_GET['user_id']);

$stmt = $conn->prepare("SELECT * FROM users_profile WHERE user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["exists" => false]);
    exit;
}

$data = $result->fetch_assoc();

//socialLinks array
$socialLinks = [""];
if (!empty($data['socialLinks'])) {
    $decoded = json_decode($data['socialLinks'], true);
    if (is_array($decoded)) $socialLinks = $decoded;
}
echo json_encode([
    "exists" => true,
    "artistName" => $data['artistName'],
    "genre" => $data['genre'],
    "status" => $data['status'],
    "socialLinks" => $socialLinks,
    "description" => $data['description'],
    "bookingStatus" => $data['bookingStatus'],
    "profileImage" => $data['profileImage']
]);
