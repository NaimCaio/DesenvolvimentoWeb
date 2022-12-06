<?php

try {
    $servidor = 'localhost';
    $usuario = 'root';
    $senha = 'admin123';
    $banco = 'eleicao';

    $pdo = new PDO("mysql:host=$servidor;dbname=$banco;", $usuario, $senha);
} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage();
    exit;
}