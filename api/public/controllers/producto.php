<?php
include_once 'modules/producto.php';

//------------------------------------GET

$app->get('/producto',function($request, $response, $args){
    $db = SQL::connect();
    $model = new Producto();
    $results = $model->get($db);
    SQL::close($db);

    $payload = json_encode($results);
    $response->getBody()->write($payload);

    return $response
                    ->withHeader('Content-type','aplication/json');
});

//----------------------------------DELETE

$app->delete('/producto/{id}',function($request, $response, $args){
    $id = $args['id'];
    $db = SQL::connect();
    $model = new Producto();
    $results = $model->delete($db, $id);
    SQL::close($db);

    $payload = json_encode($results);
    $response->getBody()->write($payload);

    return $response
                    ->withHeader('Content-type','aplication/json');
});

//----------------------------------POST
$app->post('/producto',function($request, $response, $args){
    $db = SQL::connect();
    $model = new Producto();
    $results = $model->post($db);
    SQL::close($db);

    $payload = json_encode($results);
    $response->getBody()->write($payload);

    return $response
                    ->withHeader('Content-type','aplication/json');
});

//----------------------------------PUT

$app->put('/producto',function($request, $response, $args){
    $db = SQL::connect();
    $model = new Producto();
    $results = $model->put($db);
    SQL::close($db);

    $payload = json_encode($results);
    $response->getBody()->write($payload);

    return $response
                    ->withHeader('Content-type','aplication/json');
})
?>