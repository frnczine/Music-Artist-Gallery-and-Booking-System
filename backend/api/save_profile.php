<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

include "../config.php";

$user_id        = isset($_POST['user_id']) ? intval($_POST['user_id']) : null;
$artistName     = $_POST['artistName'] ?? "";
$genre          = $_POST['genre'] ?? "";
$status         = $_POST['status'] ?? "";
$socialLinks    = $_POST['socialLinks'] ?? "[]"; //Retrieves socialLinks sent from frontend - Profile.jsx (JSON string)
$description    = $_POST['description'] ?? "";
$bookingStatus  = $_POST['bookingStatus'] ?? "available";

//validation
if (!$user_id) {
    echo json_encode(["success" => false, "error" => "missing user_id"]);
    exit;
}
//handles the file upload
$uploadedImage = null;
if (!empty($_FILES["profileImage"]["name"])) {
    $uploadDir = __DIR__ . "/uploads/"; //Directory where uploaded files will be saved.
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    $fileName = time() . "_" . basename($_FILES["profileImage"]["name"]);
    $target = $uploadDir . $fileName;

    if (move_uploaded_file($_FILES["profileImage"]["tmp_name"], $target)) {
        $uploadedImage = $fileName;
    } else {
        echo json_encode(["success" => false, "error" => "failed_upload"]);
        exit;
    }
}
//checks if user already has a profile
$check = $conn->prepare("SELECT profileImage FROM users_profile WHERE user_id = ?");
$check->bind_param("i", $user_id);
$check->execute();
$result = $check->get_result();
$exists = $result->num_rows > 0;
$currentImage = $exists ? $result->fetch_assoc()['profileImage'] : null;

if ($exists) {
    if ($uploadedImage) {
        $stmt = $conn->prepare("UPDATE users_profile SET artistName=?, genre=?, status=?, socialLinks=?, description=?, bookingStatus=?, profileImage=? WHERE user_id=?");
        $stmt->bind_param("sssssssi", $artistName, $genre, $status, $socialLinks, $description, $bookingStatus, $uploadedImage, $user_id);
    } else {
        $stmt = $conn->prepare("UPDATE users_profile SET artistName=?, genre=?, status=?, socialLinks=?, description=?, bookingStatus=? WHERE user_id=?");
        $stmt->bind_param("ssssssi", $artistName, $genre, $status, $socialLinks, $description, $bookingStatus, $user_id);
    }
} else {
    $stmt = $conn->prepare("INSERT INTO users_profile (user_id, artistName, genre, status, socialLinks, description, bookingStatus, profileImage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("isssssss", $user_id, $artistName, $genre, $status, $socialLinks, $description, $bookingStatus, $uploadedImage);
}
if (!$stmt) {
    echo json_encode(["success" => false, "error" => $conn->error]);
    exit;
}
if (!$stmt->execute()) {
    echo json_encode(["success" => false, "error" => $stmt->error]);
    exit;
}
//success response & profile image
echo json_encode([
    "success" => true,
    "message" => $exists ? "updated" : "inserted",
    "profileImage" => $uploadedImage ?? $currentImage
]);
exit;
