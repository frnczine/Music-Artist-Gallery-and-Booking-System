<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once "../config.php";
//login authentication if user exists in database
$data = json_decode(file_get_contents("php://input"), true);
$username = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (!$username || !$password) {
    echo json_encode(["status" => "error", "message" => "Missing credentials"]);
    exit;
}
$sql = "
SELECT 
    r.user_id,
    r.FirstName,
    r.LastName,
    r.Role,
    r.Username,
    r.Password,
    a.artist_id
FROM registration r
LEFT JOIN artist a ON a.user_id = r.user_id
WHERE r.Username = ?
LIMIT 1
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["status" => "error", "message" => "User not found"]);
    exit;
}
$user = $result->fetch_assoc();

if ($user['Password'] !== $password) {
    echo json_encode(["status" => "error", "message" => "Wrong password"]);
    exit;
}
echo json_encode([
    "status" => "success",
    "user" => [
        "user_id"   => $user["user_id"],
        "artist_id" => $user["artist_id"],
        "firstname" => $user["FirstName"],
        "lastname"  => $user["LastName"],
        "role"      => $user["Role"],
        "Username"  => $user["Username"]
    ]
]);
exit;
