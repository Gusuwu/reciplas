<?php
include_once 'modules/cliente.php';

//------------------------------------GET

$app->get('/cliente',function($request, $response, $args){
    $db = SQL::connect();
    $model = new Cliente();
    $results = $model->get($db);
    SQL::close($db);

    $payload = json_encode($results);
    $response->getBody()->write($payload);

    return $response
                    ->withHeader('Content-type','aplication/json');
});

//----------------------------------DELETE

$app->delete('/cliente/{id}',function($request, $response, $args){
    $id = $args['id'];
    $db = SQL::connect();
    $model = new Cliente();
    $results = $model->delete($db, $id);
    SQL::close($db);

    $payload = json_encode($results);
    $response->getBody()->write($payload);

    return $response
                    ->withHeader('Content-type','aplication/json');
});

//----------------------------------POST
$app->post('/cliente',function($request, $response, $args){
    $db = SQL::connect();
    $model = new Cliente();
    $results = $model->post($db);
    SQL::close($db);

    $payload = json_encode($results);
    $response->getBody()->write($payload);

    return $response
                    ->withHeader('Content-type','aplication/json');
});

//----------------------------------PUT

$app->put('/cliente',function($request, $response, $args){
    $db = SQL::connect();
    $model = new Cliente();
    $results = $model->put($db);
    SQL::close($db);

    $payload = json_encode($results);
    $response->getBody()->write($payload);

    return $response
                    ->withHeader('Content-type','aplication/json');
})
?>