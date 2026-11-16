<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "../config.php";

//Fetches all of the pending artists (for admin verification) & their profile image
$sql = "
    SELECT 
        verification.Username,
        verification.Genre,
        verification.Status,
        users_profile.profileImage
    FROM verification
    LEFT JOIN users_profile 
        ON users_profile.artistName = verification.Username
    WHERE verification.Status = 'pending'
";

$result = $conn->query($sql);
$pending = [];

while ($row = $result->fetch_assoc()) {
    $pending[] = [
        "Username" => $row["Username"],
        "Genre" => $row["Genre"],
        "Status" => $row["Status"],
        "profileImage" => $row["profileImage"]
    ];
}
echo json_encode($pending);
