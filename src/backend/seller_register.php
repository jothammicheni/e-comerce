<?php
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
   // $data = json_decode(file_get_contents('php://input'), true);
    $name = $_POST['name'];
    $email = $_POST['email'];
    $pwd = $_POST['password'];
    $phone = $_POST['phone'];
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
   
   

    // Check if the email already exists in the database
    // Use prepared statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM sellerregister WHERE sellerEmail = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows == 1) {
        echo  'Exist'  ;
        exit();
    }
    // Prepare the SQL statement
   // $stmt = $conn->prepare("INSERT INTO buy (name,email,address,password,zip,city,county) VALUES (?,?,?,?,?,?,?)");
   // $stmt->bind_param("sssssss",'$name', '$email','$pwd','$address','  ','  ',' ');
//$Email='SELECT* FROM  sellerregister WHERE sellerEmail="$email"'

 $sql = "INSERT INTO sellerregister(sellerName,sellerEmail,sellerPhone,sellerPwd) VALUES ('$name', '$email','$phone','$pwd')";
        
   
    // Execute the SQL statement
    if ($conn->query($sql) === TRUE) {
        echo "Data inserted successfully.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }


}


// // Retrieve data from the database
// $sql = "SELECT sellerName, sellerEmail, sellerPhone FROM sellerregister";
// $result = mysqli_query($conn, $sql);

// if (mysqli_num_rows($result) > 0) {
//     while ($row = mysqli_fetch_assoc($result)) {
//         echo "Seller Name: " . $row['sellerName'] . "<br>";
//         echo "Seller Email: " . $row['sellerEmail'] . "<br>";
//         echo "Seller Phone: " . $row['sellerPhone'] . "<br>";
//         echo "<br>";
//     }
// } else {
//     echo "No data found.";
// }

mysqli_close($conn);
?>
