<?php
session_start(); // Start or resume the session


header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "avitondatabase";

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handling form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Use prepared statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM sellerregister WHERE sellerEmail = ? AND sellerPwd = ?");
    $stmt->bind_param("ss", $email, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result === false) {
        echo "Error: " . mysqli_error($conn);
    }

    if ($result->num_rows == 1) {
        // Email and password combination is correct
                // Set session variables
        $_SESSION['email'] = $email;
            // Retrieve user's name from database
        $userRow = $result->fetch_assoc();
        $name = $userRow['sellerName'];
        $auth=1;
            // Create an associative array
      $userData = array(
        'name' => $name,
        'email' => $email,
       
      );
      echo json_encode($userData);


       
    } else {
        // Invalid email or password
        echo "invalid";
    }

    $stmt->close();
}

mysqli_close($conn);
?>
