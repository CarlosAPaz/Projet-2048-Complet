<?php
include("config.php");


$user = $_POST['user'];
$actif = $_POST['actif'];
// pour se connecter a la base de donnee deja creer
$mysqli = new mysqli($db_host,$db_user,$db_password,$db_name);

if ($mysqli -> connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
    exit();
}

$sql = "UPDATE `pazcarlo_2048` SET `actif`='$actif' WHERE `nom`='$user'";
if ($mysqli->query($sql) === TRUE) {
    echo json_encode(array("statusCode"=>200));
  } else {
    echo json_encode(array("statusCode"=>201));
  }

$mysqli -> close();    

?>