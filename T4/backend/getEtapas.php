<?php

include './conexao.php';

$sql = $pdo->query("SELECT * FROM etapas;");

$sql->execute();

$fetch = $sql->fetchAll();

$json = json_encode($fetch);

echo $json;