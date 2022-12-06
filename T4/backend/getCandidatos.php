<?php

include './conexao.php';

$sql = $pdo->query("SELECT 
c.numero,
c.nome,
c.titulo,
c.foto,
c.votos,
c.partido,
v.nome 'Vice',
v.partido 'VicePartido',
v.foto 'ViceFoto'
FROM eleicao.candidatos c
left join eleicao.vices v 
on c.viceId= v.id;");

$sql->execute();

$fetch = $sql->fetchAll();

$json = json_encode($fetch);

echo $json;