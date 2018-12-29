/*
 *	PK4YO Co. Ltd.
 *  Author: Zhang Hui <spacetiller@163.com>
 *  Time: Dec. 2018
 *  All Copyrights Reserved.
 */
var express = require('express');
var router = express.Router();
var conn = require('../common/database');
var Area = require('../../models/area/area.js');

var area = new Area();

const table_name = area.table_name; //'pkproject';
const table_cols = area.table_cols; //'pkproject';

//console.log(table_name);

/* GET all listing. */
router.get('/', function(req, res, next) {
	var cbfunc = function(error, results, fields) {
		if(error){
			console.log(error);
		}
		var retjson = {"code":0,"data":[]};
		if(results && results.length > 0){
			retjson.data = results;
		}
		//res.json(JSON.stringify(retjson));
        //res.end('is over');
		res.send(JSON.stringify(retjson));
		console.log('all listing json sent over. ');
	};
	conn.queryList(req, table_name, cbfunc);
	console.log("all listing first here"); 
});

/* GET condition listing. */
router.get('/getbycond', function(req, res, next) {
	var retjson = {"code":0,"data":[]};
	var cbfunc = function(error, results, fields) {
		if(error){
			console.log(error);
		}
		if(results.length > 0){
			retjson.data = results;
		}
		res.send(JSON.stringify(retjson));
		console.log('condition listing json sent over. ');
	};
	conn.queryList(req, table_name, cbfunc);
	console.log("condition listing first here"); 
});

/* GET one . */
router.get('/getbyid', function(req, res, next) {
	var retjson = {"code":0,"data":[]};
	var cbfunc = function(error, results, fields) {
		if(error){
			console.log(error);
		}
		if(results.length > 0){
			retjson.data = results;
		}
		res.send(JSON.stringify(retjson));
		console.log('one by id json sent over. ');
	};
	conn.queryOneById(req, table_name, cbfunc);
	console.log("get one by id first here"); 
});

/* add one
 *
 */
router.get('/add', function(req, res, next) {
	var sql = 'insert into ' + table_name + ' set ?';
	var post = {};

	table_cols.forEach(function(v,i,arr){
		//console.log('-- foreach ', i ,' -- ');
		if(i != 0){
			if(req.query && req.query[table_cols[i]]){
				post[table_cols[i]] = req.query[table_cols[i]];
				//sql = sql + '"' + req.query.name + '"';
			}else if(req.params && req.params[table_cols[i]]){
				post[table_cols[i]] = req.params[table_cols[i]];
			}else if(req.body && req.body[table_cols[i]]){
				post[table_cols[i]] = req.body[table_cols[i]];
			}
		}
	});
	console.log(post);
	conn.query(sql, post,function(error, results, fields) {
		if(error){
			console.log(error);
		}
		var retjson = {"code":0,"msg":"ok"};
		res.send(JSON.stringify(retjson));
		retjson.addrId = results?results.insertId:'-1';
        //res.end('is over');
		console.log('sql add over ');
	});
	console.log("sql add first here"); 
});

router.get('/update', function(req, res, next) {
	var sql = 'UPDATE ' + table_name + ' SET ' ;
	var sql_params = ['',0];

	var col_len = table_cols.length;

	var update_i = 0;
	console.log(req.query)
	table_cols.forEach(function(v,i,arr){
		//console.log('-- foreach ', i ,' -- ');
		if(i != 0){
			if(req.query && req.query[table_cols[i]]){
				if(update_i == 0){
					sql = sql + table_cols[i] + ' = ? ';
				}else{
					sql = sql + ', ' + table_cols[i] + ' = ? '; 
				}
				//console.log('>>> hit ', req.query[table_cols[i]]);
				sql_params[update_i] = req.query[table_cols[i]];
				update_i ++;
				//sql = sql + '"' + req.query.name + '"';
			}else if(req.params && req.params[table_cols[i]]){
				if(update_i == 0){
					sql = sql + table_cols[i] + ' = ? ';
				}else{
					sql = sql + ', ' + table_cols[i] + ' = ? '; 
				}
				sql_params[update_i] = req.params[table_cols[i]];
				update_i ++;
			}else if(req.body && req.body[table_cols[i]]){
				if(update_i == 0){
					sql = sql + table_cols[i] + ' = ? ';
				}else{
					sql = sql + ', ' + table_cols[i] + ' = ? '; 
				}
				sql_params[update_i] = req.body[table_cols[i]];
				update_i ++;
			}
		}
	});
	sql += ' WHERE ' + table_cols[0] + ' = ?';
	console.log(sql);
	if(req.query && req.query[table_cols[0]]){
		sql_params[update_i] = req.query[table_cols[0]];
	}else if(req.params && req.params[table_cols[0]]){
		sql_params[update_i] = req.params[table_cols[0]];
	}else if(req.body && req.body[table_cols[0]]){
		sql_params[update_i] = req.body[table_cols[0]];
	}
	console.log(sql_params);
	conn.query(sql,sql_params,function(error, results, fields) {
		if(error){
			console.log(error);
		}
		var retjson = {"code":0,"msg":"ok"};
		res.send(JSON.stringify(retjson));
		console.log('sql update over: ');
        //res.end('is over');
		//console.log('connected as id ' + conn.threadId);
		//conn.releaseConnection();
	});
	console.log("sql update first here"); 
});

router.get('/delete', function(req, res, next) {
	var sql = 'delete from ' + table_name + ' WHERE ' + table_cols[0] + ' = ?';
	var sql_params = [0];

	if(req.params && req.params[table_cols[0]]){
		sql_params[0] = req.params[table_cols[0]];
	}else if(req.query && req.query[table_cols[0]]){
		sql_params[0] = req.query[table_cols[0]];
	}else if(req.body && req.body[table_cols[0]]){
		sql_params[0] = req.body[table_cols[0]];
	}
	conn.query(sql,sql_params,function(error, results, fields) {
		if(error){
			console.log(error);
		}
		var retjson = {"code":0,"msg":"ok"};
		//res.json(JSON.stringify(retjson));
        //res.end('is over');
		res.send(JSON.stringify(retjson));
		console.log('sql delete over ');
	});
	console.log("sql delete first here"); 
});

module.exports = router;
