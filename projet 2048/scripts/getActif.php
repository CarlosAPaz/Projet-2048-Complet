<?php
include("config.php");

// pour se connecter a la base de donnee deja creer
$mysqli = new mysqli($db_host,$db_user,$db_password,$db_name);

if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}

$sql = "SELECT nom FROM pazcarlo_2048 WHERE actif='true'";

if ($result = $mysqli -> query($sql)) {
    $len = 0;
    while ($row = $result -> fetch_row()) {
        $len = $len + 1;
      }
    echo("$len");
  $result -> free_result();
}

$mysqli -> close();
?>