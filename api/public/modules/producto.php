<?php

class Producto
{

    public $table = 'Producto';
    public $fields = 'ID_Producto
                ,Nombre
                ,Stock
                ,Precio
                ,Estado_Entrega
                ,Descripcion
                ,Stock_Futuro'; 
    public $join = "";

    //----------------------------------GET
    public function get($db) {
        $sql = "SELECT $this->fields FROM $this->table";
        $params = null;
        $stmt = SQL::query($db, $sql, $params);

        $results = [];
        while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
            $results[] = $row;
        }

        return $results;
    }
    
    //---------------------------------DELETE
    public function delete($db,$id) {
        $sql = "DELETE FROM $this->table
                WHERE ID_Producto = ?";
        $params = [$id];
        $stmt = SQL::query($db, $sql, $params);

        sqlsrv_fetch($stmt);

        return [];
    }
    
    //---------------------------------POST

    public function post($db) {
        $sql = "INSERT INTO $this->table
                (Nombre
                ,Stock
                ,Precio
                ,Estado_Entrega
                ,Descripcion
                ,Stock_Futuro) 
                VALUES(?,?,?,0,?,?);
                
                SELECT @@IDENTITY ID_Producto";

        $params = [DATA["Nombre"]
        ,DATA["Stock"]
        ,DATA["Precio"]
        ,DATA["Descripcion"]
        ,DATA["Stock_Futuro"]
        ];

        $stmt = SQL::query($db, $sql, $params);

        sqlsrv_fetch($stmt);
        sqlsrv_next_result($stmt);
        $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

        $results = DATA;
        $results["ID_Producto"] = $row["ID_Producto"];
        $results["Estado_Entrega"] = 0;

        return $results;
}
    //---------------------------------PUT

    public function put($db) {
        $sql = "UPDATE $this->table
                SET Nombre = ?           
                ,Stock = ?
                ,Precio = ?
                ,Estado_Entrega = ?
                ,Descripcion = ?
                ,Stock_Futuro = ?
                WHERE ID_Producto = ?";
        $params = [DATA["Nombre"]
        ,DATA["Stock"]
        ,DATA["Precio"]
        ,DATA["Estado_Entrega"]
        ,DATA["Descripcion"]
        ,DATA["Stock_Futuro"]
        ];
        $stmt = SQL::query($db,$sql,$params);

        sqlsrv_fetch($stmt);

        return DATA;
    }
}
?>