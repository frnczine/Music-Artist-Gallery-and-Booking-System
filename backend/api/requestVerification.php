<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include "../config.php";

//Reads input data & validates required fields
$input = file_get_contents("php://input");
$data = json_decode($input, true);

$username = $data["username"] ?? $_POST["username"] ?? "";
$genre    = $data["genre"]    ?? $_POST["genre"]    ?? "";

if (!$username || !$genre) {
    echo json_encode(["status" => "error", "message" => "Missing info"]);
    exit;
}

//prevents duplicate requests
$check = $conn->prepare("SELECT * FROM verification WHERE Username=?");
$check->bind_param("s", $username);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $status = strtolower($row["Status"]);

    if ($status === "verified") {
        echo json_encode(["status" => "exists", "message" => "Already verified"]);
        exit;
    }
    if ($status === "pending") {
        echo json_encode(["status" => "exists", "message" => "Already pending"]);
        exit;
    }
}
//Insert request for verification
$stmt = $conn->prepare(
    "INSERT INTO verification (Username, Genre, Status)
     VALUES (?, ?, 'Pending')"
);
$stmt->bind_param("ss", $username, $genre);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Request sent"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}
?>
