<?php
include_once 'modules/materia-prima.php';

//----------------------------------GET

$app->get("/materia-prima",function ($request, $response, $args){
    $db = SQL::connect();
    $model = new MateriaPrima();
    $results = $model->get($db);
    SQL::close($db);

    $payload = json_encode($results);
    $response->getBody()->write($payload);

    return $response
                    ->withHeader('Content-type','aplication/json');
});

//---------------------------------DELETE

$app->delete("/materia-prima/{id}",function ($request, $response, $args){
    $id = $args['id'];
    $db = SQL::connect();
    $model = new MateriaPrima();
    $results = $model->delete($db,$id);
    SQL::close($db);

    $payload = json_encode($results);
    $response->getBody()->write($payload);

    return $response
                    ->withHeader('Content-type','aplication/json');
});

//---------------------------------POST

$app->post("/materia-prima",function ($request, $response, $args){
    $db = SQL::connect();
    $model = new MateriaPrima();
    $results = $model->post($db);
    SQL::close($db);

    $payload = json_encode($results);
    $response->getBody()->write($payload);

    return $response
                    ->withHeader('Content-type','aplication/json');
});

//----------------------------------PUT

$app->put("/materia-prima",function ($request, $response, $args){
    $db = SQL::connect();
    $model = new MateriaPrima();
    $results = $model->put($db);
    SQL::close($db);

    $payload = json_encode($results);
    $response->getBody()->write($payload);

    return $response
                    ->withHeader('Content-type','aplication/json');
});
?>