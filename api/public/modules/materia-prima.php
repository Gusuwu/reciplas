<?php

class MateriaPrima 
{
    public $table = "MateriaPrima";
    public $fields = 'ID_MateriaPrima
	                ,MateriaPrima.Nombre
	                ,Precio
	                ,Cantidad
                    ,MateriaPrima.ID_Proveedor
                    ,Proveedor.Nombre AS ProveedorNombre';
    public $join = "LEFT OUTER JOIN Proveedor ON Proveedor.ID_Proveedor = MateriaPrima.ID_Proveedor";

    //----------------------------------GET

    public function get($db) {
        $sql = "SELECT $this->fields FROM $this->table
                $this->join";
        $params = null;
        if(isset($_GET["ID_MateriaPrima"])){
            $params = [$_GET["ID_MateriaPrima"]];
            $sql = $sql . "AND ID_MateriaPrima = ?";
        }
        $stmt = SQL::query($db,$sql,$params);

        $results = [];
        while ($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)) {
            $results[] = $row;
        };
        return $results;
    }

    //---------------------------------DELETE

    public function delete($db, $id) {
        $sql = "DELETE FROM $this->table
                WHERE ID_MateriaPrima = ?";
        $params = [$id];
        $stmt = SQL::query($db,$sql,$params);

        sqlsrv_fetch($stmt);

        return [];
    }

    //---------------------------------POST

    public function post($db) {
        $sql = "INSERT INTO $this->table
                (Nombre
                ,Precio
                ,Cantidad
                ,ID_Proveedor)
                VALUES(?,?,?,?);
                
                SELECT @@IDENTITY ID_MateriaPrima;";

        $params = [DATA["Nombre"]
                ,DATA["Precio"]
                ,DATA["Cantidad"]
                ,DATA["ID_Proveedor"]
                ];

        $stmt = SQL::query($db,$sql,$params);

        sqlsrv_fetch($stmt);
        sqlsrv_next_result($stmt);

        $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

        $results[] = DATA;
        $results["ID_MateriaPrima"] = $row["ID_MateriaPrima"];


        return DATA;
    }

    //-----------------------------PUT

    public function put($db) {
        $sql = "UPDATE $this->table
                SET Nombre = ?
                    ,Precio = ?
                    ,Cantidad = ?
                    ,ID_Proveedor = ?
                WHERE ID_MateriaPrima = ?";
        
        $params = [DATA["Nombre"]
                ,DATA["Precio"]
                ,DATA["Cantidad"]
                ,DATA["ID_Proveedor"]
                ,DATA["ID_MateriaPrima"]];
        $stmt = SQL::query($db, $sql, $params);

        sqlsrv_fetch($stmt);

        return [];

    }

}
?>