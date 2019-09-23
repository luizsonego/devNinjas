const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : '',
  database : 'lojinha'
});


function createTable(conn){
    const sql = "CREATE TABLE IF NOT EXISTS products (\n"+
        "id int NOT NULL AUTO_INCREMENT, \n"+
        "sku varchar(16) NOT NULL UNIQUE, \n"+
        "name varchar(60) NOT NULL UNIQUE, \n"+
        "price decimal(10,2) NOT NULL, \n"+
        "created_at datetime NOT NULL, \n"+
        "updated_at datetime NOT NULL, \n"+
        "PRIMARY KEY (id)\n"+
        ");";

        conn.query(sql, function (error, results, fields){
            if(error) return console.log(error);
            console.log('criou!');
        });
}

function addRows(conn){
    const sql = "INSERT INTO products(sku, name, price, created_at, updated_at) VALUES ?";
    const values = [
        ['8552515751438644', 'Casaco Jaqueta Inverno', '100.90', '2019-09-15 11:00:00', '2019-09-15 11:00:00'],
        ['8552515751438645', 'Casaco Jaqueta Verao', '100.90', '2019-09-15 11:00:00', '2019-09-15 11:00:00'],
        ['8552515751438655', 'Casaco Inverno', '100.90', '2019-09-15 11:00:00', '2019-09-15 11:00:00']
    ];

    conn.query(sql, [values], function(error, results, fields){
        if(error) return console.log(error)
        console.log('adicionou')
        conn.end();
    })
}

connection.connect(function(err){
    if(err) return console.log(err);
    console.log('conectou')
    createTable(connection)
    addRows(connection)
})