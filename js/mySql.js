var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "Bali",
  password: "Bw330405",
  database: "HomeAutomation"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// dropDatabase("exampledb");
//dropTable("users");
//deleteRecords("users");
//createTable("places");
// insertRecords();


function dropDatabase(database){
  con.query("DROP DATABASE " +database, function (err, result, fields) {
  if (err) throw err;
  console.log(result);
    });
  }
  
function dropTable(table){
  con.query("DROP TABLE " +table, function (err, result, fields) {
  if (err) throw err;
  console.log(result);
    });
  }
  
function deleteRecords(table){
  con.query("DELETE FROM " +table, function (err, result, fields) {
  if (err) throw err;
  console.log(result);
    });
    
}

function selectFrom(table){
    con.query("SELECT * FROM " + table, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
      });
    }

function createTable(name){
  var sql = "CREATE TABLE " + name + " (place varchar(255), led_state varchar(255), heat_state varchar(255), room_temp int);"

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  }

function insertRecords(){
  var sql = "INSERT INTO places (place, led_state, heat_state, room_temp) VALUES ?";
  var values = [
    ["Bazsi", "1ledBazsi", "1", 25],
    ["Tomi", "1ledTomi", "1", 25],
    ["Gabi", "1ledGabi", "1", 25],
    ["Cp", "1ledCp",,,],
    ["Bath",,,,],
    ["Pad",,,,],
    ["Out",,,,]
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
  
}

