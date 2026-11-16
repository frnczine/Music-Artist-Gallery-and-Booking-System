<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require_once "../config.php";

$data = json_decode(file_get_contents("php://input"), true);

$firstName = $conn->real_escape_string($data["firstName"]);
$lastName  = $conn->real_escape_string($data["lastName"]);
$email     = $conn->real_escape_string($data["email"]);
$password = $conn->real_escape_string($data["password"]);
$role      = $conn->real_escape_string($data["role"]);

//checks if the email already exists from database
$check = $conn->query("SELECT * FROM registration WHERE Username='$email'");
if ($check->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Email already registered."]);
    exit;
}

//inserts into registration table
$sql = "INSERT INTO registration (FirstName, LastName, Username, Password, Role)
        VALUES ('$firstName', '$lastName', '$email', '$password', '$role')";

if ($conn->query($sql) === TRUE) {
    $newUserId = $conn->insert_id;

    // If the registered user is an artist, role "artist".
    if ($role === "artist") {
        $artistName = $firstName . " " . $lastName;

        $stmt = $conn->prepare(
            "INSERT INTO artist (user_id, name) VALUES (?, ?)"
        );
        $stmt->bind_param("is", $newUserId, $artistName);
        $stmt->execute();
    }

    echo json_encode(["status" => "success"]);
}
 else {
    echo json_encode([
        "status" => "error",
        "message" => $conn->error
    ]);
}
$conn->close();
?>
