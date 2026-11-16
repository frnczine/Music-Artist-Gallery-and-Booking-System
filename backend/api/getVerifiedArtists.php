<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "../config.php";
//Retrieval of verified artists for the Admin side
$sql = "
    SELECT 
        verification.Username,
        verification.Genre,
        verification.Status,
        users_profile.profileImage
    FROM verification
    LEFT JOIN users_profile 
        ON users_profile.artistName = verification.Username
    WHERE verification.Status = 'verified'
";

$result = $conn->query($sql);

$verified = [];

while ($row = $result->fetch_assoc()) {
    $verified[] = [
        "Username" => $row["Username"],
        "Genre" => $row["Genre"],
        "Status" => $row["Status"],
        "profileImage" => $row["profileImage"]
    ];
}

echo json_encode($verified);
