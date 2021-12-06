<?php

class Proveedor
{

    public $table = 'Proveedor';
    public $fields = 'ID_Proveedor
                ,Nombre
                ,Telefono
                ,Direccion
                ,CUIT
                ,FechaAlta'; 
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
                WHERE ID_Proveedor = ?";
        $params = [$id];
        $stmt = SQL::query($db, $sql, $params);

        sqlsrv_fetch($stmt);

        return [];
    }
    
    //---------------------------------POST

    public function post($db) {
        $sql = "INSERT INTO $this->table
                (Nombre
                ,Telefono
                ,Direccion
                ,CUIT
                ,FechaAlta) 
                VALUES(?,?,?,?,GETDATE());
                
                SELECT @@IDENTITY ID_Proveedor CONVERT(VARCHAR, GETDATE(),126) FechaAlta;";

        $params = [DATA["Nombre"]
        ,DATA["Telefono"]
        ,DATA["Direccion"]
        ,DATA["CUIT"]
        ];

        $stmt = SQL::query($db, $sql, $params);

        sqlsrv_fetch($stmt);
        sqlsrv_next_result($stmt);
        $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

        $results = DATA;
        $results["ID_Proveedor"] = $row["ID_Proveedor"];
        $results["FechaAlta"] = $row["FechaAlta"];

        return $results;
}
    //---------------------------------PUT

    public function put($db) {
        $sql = "UPDATE $this->table
                SET Nombre = ?           
                ,Telefono = ?
                ,Direccion = ?
                ,CUIT = ?
                WHERE ID_Proveedor = ?";
        $params = [DATA["Nombre"]
        ,DATA["Telefono"]
        ,DATA["Direccion"]
        ,DATA["CUIT"]
        ];
        $stmt = SQL::query($db,$sql,$params);

        sqlsrv_fetch($stmt);

        return DATA;
    }
}
?>