<?php
include("config.php");

// pour se connecter a la base de donnee deja creer
$mysqli = new mysqli($db_host,$db_user,$db_password,$db_name);

if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}

$sql = "SELECT nom,score,date_inscription FROM pazcarlo_2048";

if ($result = $mysqli -> query($sql)) {

  while ($row = $result -> fetch_row()) {
    printf ("<tr> <td>%s</td> <td>%s</td> <td>%s</td> </tr>\n", $row[0], $row[1], $row[2]);
  }

  $result -> free_result();
}

$mysqli -> close();
?>
