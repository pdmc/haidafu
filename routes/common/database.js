/*
 *	PK4YO Co. Ltd.
 *  Author: Zhang Hui <spacetiller@163.com>
 *  Time: Dec. 2018
 *  All Copyrights Reserved.
 */
var express = require('express');
var mysql  = require('mysql');  
var dbconfig = require('../../config/database');
var pool  = mysql.createPool(dbconfig);

pool.queryOneById = function(req, table_name, callback){
	var ModelTable = require('../../models/' + table_name + '/' + table_name + '.js');

	console.log(__filename);
 	var rets = '';
	var sql = 'SELECT DISTINCT ';
	var sql_params = [0];
	var retjson = {"code":0,"data":[]};

	var model_table = ModelTable();
	//console.log(model_table);
	//console.log(model_table.table_cols);

	// prepare sql sentence
	model_table.table_cols.forEach(function(v,i,arr){
		//console.log('-- foreach ', i ,' -- ');
		if(i != 0){
			sql = sql + ', ' + model_table.table_name + '.' + model_table.table_cols[i];
		}else{
			sql = sql + model_table.table_name + '.' + model_table.table_cols[i];
		}
	});
	//console.log(sql);
	if(!model_table.table_cross_checked && !model_table.check_table_cross()){
		retjson.code = 1;
		retjson.msg = 'cross table checked error';
		res.send(JSON.stringify(retjson));
		return;
	}
	//console.log(sql);
	model_table.table_cross_name.forEach(function(v,i,arr){
		model_table.table_cross_cols[i].forEach(function(w,j,array){
			if(model_table.table_cross_cols[i][j].fkey){
				model_table.table_cross_cols[i][j].cols.forEach(function(x,k,array2){
					sql = sql + ', ' + model_table.table_cross_cols[i][j].table + '.' + model_table.table_cross_cols[i][j].cols[k] + ' AS ' + model_table.table_cross_column_as[i][j][k];
				});
			}else{
				sql = sql + ', ' + model_table.table_cross_name[i] + '.' + model_table.table_cross_cols[i][j] + ' AS ' + model_table.table_cross_column_as[i][j];
			}
		});
	});
	//console.log(sql);
	sql = sql + ' FROM ' + model_table.table_name;
	model_table.table_cross_name.forEach(function(v,i,arr){
		sql = sql + ', ' + model_table.table_cross_name[i];
		model_table.table_cross_cols[i].forEach(function(w,j,array){
			if(model_table.table_cross_cols[i][j].fkey){
				sql = sql + ', ' + model_table.table_cross_cols[i][j].table;
			}
		});
	});
	//console.log(sql);
	sql = sql + ' WHERE ';
	model_table.table_cross_name.forEach(function(v,i,arr){
		sql = sql + model_table.table_name + '.' + model_table.table_cross_fkey[i] + ' = ' + model_table.table_cross_name[i] + '.' + model_table.table_cross_cols[i][0] + ' AND ';
		model_table.table_cross_cols[i].forEach(function(w,j,array){
			if(model_table.table_cross_cols[i][j].fkey){
				sql = sql + model_table.table_cross_cols[i][j].table + '.' + model_table.table_cross_cols[i][j].cols[0] + ' = ' + model_table.table_cross_name[i] + '.' + model_table.table_cross_cols[i][j].fkey + ' AND ';
			}
		});
	});
	sql = sql + model_table.table_name + '.' + model_table.table_cols[0] + ' = ?';
	console.log(sql);
	
	//	prepare param values
	if(req.params && req.params[model_table.table_cols[0]]){
		sql_params[0] = req.params[model_table.table_cols[0]];
	}else if(req.query && req.query[model_table.table_cols[0]]){
		sql_params[0] = req.query[model_table.table_cols[0]];
	}else if(req.body && req.body[model_table.table_cols[0]]){
		sql_params[0] = req.body[model_table.table_cols[0]];
	}
	
	//	execute sql
	pool.query(sql,sql_params,callback);
	console.log("first here"); 
};

module.exports = pool;


