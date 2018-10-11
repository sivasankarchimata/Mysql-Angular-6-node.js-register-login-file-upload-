
console.log('welcome config.js ');

const http = require('http');
var mysql  = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'sample_db'
});

connection.connect((err)=>{
   if(!err)
   console.log('db connection Success');     
   else
   console.log('db connection fail');

});

module.exports = connection;


//include the model (aka DB connection)
//var db = require('../models/dbconnection'); 





