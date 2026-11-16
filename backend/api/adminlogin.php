<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require_once "../config.php";

$data = json_decode(file_get_contents("php://input"), true);

//For Admin login authentication
$email = $data["email"] ?? '';
$password = $data["password"] ?? '';

if (!$email || !$password) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing email or password"
    ]);
    exit();
}

$sql = "SELECT * FROM registration WHERE Username = ? AND Role = 'admin'";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Admin account not found"
    ]);
    exit();
}

$user = $result->fetch_assoc();

//compare pass if same from the database
if ($user["Password"] !== $password) {
    echo json_encode([
        "status" => "error",
        "message" => "Incorrect password"
    ]);
    exit();
}

echo json_encode([
    "status" => "success",
    "message" => "Admin login successful",
    "user" => [
        "id" => $user["user_id"],
        "firstname" => $user["FirstName"],
        "lastname" => $user["LastName"],
        "role" => $user["Role"]
    ]
]);
?>
