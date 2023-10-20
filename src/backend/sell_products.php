<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "avitondatabase";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_FILES['itemImage']) && $_FILES['itemImage']['error'] === UPLOAD_ERR_OK) {
        $itemName = $_POST['itemName'];
        $price = $_POST['price'];
        $desc = $_POST['desc'];
        $category = $_POST['category'];
        $file = $_FILES['itemImage']['tmp_name'];
        $fileData = file_get_contents($file);

        $stmt = $conn->prepare("INSERT INTO products (itemName, itemCategory, price, itemDesc, item) VALUES (?, ?, ?, ?, ?)");

        if (!$stmt) {
            die('Error: ' . $conn->error);
        }

        $stmt->bind_param("ssdss", $itemName, $category, $price, $desc, $fileData);

        if ($stmt->execute()) {
            echo "Data inserted successfully.";
        } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Error uploading file.";
    }
}

$sql = "SELECT * FROM products";
$result = $conn->query($sql);

$data = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $row['item'] = base64_encode($row['item']);
        $data[] = $row;
    }
}

$jsonData = json_encode($data);

header('Content-Type: application/json');
echo $jsonData;

$conn->close();
?>
