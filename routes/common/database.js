var express = require('express');
var mysql  = require('mysql');  
var dbconfig = require('../../config/database');
var pool  = mysql.createPool(dbconfig);

module.exports = pool;





/*pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
pool.query2 = function(sql,callback){
	pool.query(sql, callback);
};*/
/*
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'pk4yo',              
  password : 'zzeP6GAkZ5qt',       
  port     : '3306',                   
  database : 'hdf_dev' 
}); */
/*
function Mysqlz(){
	var mysqlProcedure = function(callback){
		console.log('------------------ common::database::Mysqlz mysqlProcedure() ---------------------');
		connection = mysql.createConnection(dbconfig);
		connection.connect();
		callback.call(connection,callback);
		connection.end();
	};
	 
	var onerror = function(){
		console.log('------------------ common::database::Mysqlz onerror() ---------------------');
		console.log(err);
	};
	 
	this.query = function(){
		console.log('------------------ common::database::Mysqlz this.query() ---------------------');
		var args = arguments;
		mysqlProcedure(function(){
			connection.query.apply(connection,args)
			.on('error',onerror);	
		});
	};
}
*/
