<?php
include("config.php");

// pour se connecter a la base de donnee deja creer
$mysqli = new mysqli($db_host,$db_user,$db_password,$db_name);

if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}

$sql = "SELECT score FROM pazcarlo_2048 where score != 0 ORDER BY score asc";

if ($result = $mysqli -> query($sql)) {
  $row = $result -> fetch_row();
  printf ("<span> %s </span>", $row[0]);
  $result -> free_result();
}

$mysqli -> close();
?>