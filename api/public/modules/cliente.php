<?php

class Cliente
{

    public $table = 'Cliente';
    public $fields = 'ID_Cliente
                ,Nombre
                ,Telefono
                ,Direccion
                ,DNI
                ,CUIL
                ,Fecha_Nacimiento
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
                WHERE ID_Cliente = ?";
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
                ,DNI
                ,CUIL
                ,Fecha_Nacimiento
                ,FechaAlta) 
                VALUES(?,?,?,?,?,?,GETDATE());
                
                SELECT @@IDENTITY ID_Cliente CONVERT(VARCHAR, GETDATE(),126) FechaAlta;";

        $params = [DATA["Nombre"]
        ,DATA["Telefono"]
        ,DATA["Direccion"]
        ,DATA["DNI"]
        ,DATA["CUIL"]
        ,DATA["Fecha_Nacimiento"]
        ];

        $stmt = SQL::query($db, $sql, $params);

        sqlsrv_fetch($stmt);
        sqlsrv_next_result($stmt);
        $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

        $results = DATA;
        $results["ID_Cliente"] = $row["ID_Cliente"];
        $results["FechaAlta"] = $row["FechaAlta"];

        return $results;
}
    //---------------------------------PUT

    public function put($db) {
        $sql = "UPDATE $this->table
                SET Nombre = ?
                ,Telefono = ?
                ,Direccion = ?
                ,DNI = ?
                ,CUIL = ?
                ,Fecha_Nacimiento = ?
                WHERE ID_Cliente = ?";
        $params = [DATA["Nombre"]
        ,DATA["Telefono"]
        ,DATA["Direccion"]
        ,DATA["DNI"]
        ,DATA["CUIL"]
        ,DATA["Fecha_Nacimiento"]
        ];
        $stmt = SQL::query($db,$sql,$params);

        sqlsrv_fetch($stmt);

        return DATA;
    }
}
?>