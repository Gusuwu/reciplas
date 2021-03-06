<?php
include_once 'modules/proveedor.php';

//------------------------------------GET

$app->get('/proveedor',function($request, $response, $args){
    $db = SQL::connect();
    $model = new Proveedor();
    $results = $model->get($db);
    SQL::close($db);

    $payload = json_encode($results);
    $response->getBody()->write($payload);

    return $response
                    ->withHeader('Content-type','aplication/json');
});

//----------------------------------DELETE

$app->delete('/proveedor/{id}',function($request, $response, $args){
    $id = $args['id'];
    $db = SQL::connect();
    $model = new Proveedor();
    $results = $model->delete($db, $id);
    SQL::close($db);

    $payload = json_encode($results);
    $response->getBody()->write($payload);

    return $response
                    ->withHeader('Content-type','aplication/json');
});

//----------------------------------POST
$app->post('/proveedor',function($request, $response, $args){
    $db = SQL::connect();
    $model = new Proveedor();
    $results = $model->post($db);
    SQL::close($db);

    $payload = json_encode($results);
    $response->getBody()->write($payload);

    return $response
                    ->withHeader('Content-type','aplication/json');
});

//----------------------------------PUT

$app->put('/proveedor',function($request, $response, $args){
    $db = SQL::connect();
    $model = new Proveedor();
    $results = $model->put($db);
    SQL::close($db);

    $payload = json_encode($results);
    $response->getBody()->write($payload);

    return $response
                    ->withHeader('Content-type','aplication/json');
})
?>