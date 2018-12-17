var express = require('express');
var router = express.Router();
//var app = express();
var conn = require('../common/database');

const table_name = 'housetype';
const table_cols = ['typeId','name','status','operId','operTime'];
const col_id = 'typeid';
const col_name = 'name';

/* GET types listing. */
router.get('/', function(req, res, next) {
	//res.send('types');
	
 	var rets = '';
	var sql = 'SELECT * FROM ' + table_name + '';
	//查
	//conn.query();
	conn.query(sql,function(error, results, fields) {
		if(error){
			console.log(error);
		}
		var retjson = {"code":0,"data":[]};
		//jsonWrite(res, result);
		/*for(var i = 0; i < results.length; i++){
            console.log("请求回来！",results[i])
            res.send(JSON.stringify(results[i]));
        }*/
		//res.writeHead(200, {'Content-Type': 'application/json'});
		//res.send(getJsonRet(results));
		if(results.length > 0){
			retjson.data = results;
		}
		//res.json(JSON.stringify(retjson));
		res.send(JSON.stringify(retjson));
        res.end('is over');
		console.log('The solution 2 is: ', results[0].solution);
	});
	/*conn.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        console.log('--------------------------SELECT----------------------------');
        console.log(result);
		rets = result;
		res.send(rets);
        console.log('------------------------------------------------------------\n\n');  
		conn.end();
	});*/
	console.log("first here"); 
});

router.get('/add', function(req, res, next) {
 	var rets = '';
	//var sql = 'insert into ' + table_name + ' (`name`,`status`) values (';
	var sql = 'insert into ' + table_name + ' set ?';
	var post = {};

	//console.log(req.params); // /add/name/haohua
	//console.log(req.query);  // /add?name=haohua
	//console.log(req.body);   // post
	//console.log(req.headers);
    //console.log(req.cookies);
    //console.log(req.hostname);
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
	/*if(req.query && req.query[col_name]){
		post.name = req.query[col_name];
		//sql = sql + '"' + req.query.name + '"';
	}
	if(req.query && req.query.opertime){
		post.opertime = req.query.opertime;
		//sql = sql + '"' + req.query.name + '"';
	}*/
	//sql = sql + ', "0")';
	//var post = { name: name, status: '0', opertime: opertime};
	conn.query(sql, post,function(error, results, fields) {
		if(error){
			console.log(error);
		}
		var retjson = {"code":0,"msg":"ok"};
		//res.json(JSON.stringify(retjson));
		res.send(JSON.stringify(retjson));
        res.end('is over');
		console.log('Query add over ');
	});
	console.log("first here"); 
});

router.get('/update', function(req, res, next) {
 	var rets = '';
	//var sql = 'insert into ' + table_name + ' (`name`,`status`) values (';
	//var sql = 'UPDATE ' + table_name + ' SET ' + col_name + ' = ? WHERE ' + col_id + ' = ?';
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
	/*
	if(req.params && req.params[col_name] && req.params[col_id]){
		sql_params[0] = req.params[col_name];
		sql_params[1] = req.params[col_id];
		//sql = sql + '"' + req.query.name + '"';
	}else if(req.query && req.query[col_name] && req.query[col_id]){
		sql_params[0] = req.query[col_name];
		sql_params[1] = req.query[col_id];
		//sql = sql + '"' + req.query.name + '"';
	}*/
	//sql = sql + ', "0")';
	conn.query(sql,sql_params,function(error, results, fields) {
		if(error){
			console.log(error);
		}
		var retjson = {"code":0,"msg":"ok"};
		//res.json(JSON.stringify(retjson));
		res.send(JSON.stringify(retjson));
        res.end('is over');
		console.log('Query update over: ');
		console.log('connected as id ' + conn.threadId);
		//conn.releaseConnection();
	});
	console.log("first here"); 
});

router.get('/delete', function(req, res, next) {
 	var rets = '';
	//var sql = 'delete from ' + table_name + ' (`name`,`status`) values (';
	var sql = 'delete from ' + table_name + ' WHERE ' + table_cols[0] + ' = ?';
	var sql_params = [0];

	if(req.params && req.params[table_cols[0]]){
		sql_params[0] = req.params[table_cols[0]];
		//sql = sql + '"' + req.query.name + '"';
	}else if(req.query && req.query[table_cols[0]]){
		sql_params[0] = req.query[table_cols[0]];
		//sql = sql + '"' + req.query.name + '"';
	}else if(req.body && req.body[table_cols[0]]){
		sql_params[0] = req.body[table_cols[0]];
		//sql = sql + '"' + req.query.name + '"';
	}
	//sql = sql + ', "0")';
	conn.query(sql,sql_params,function(error, results, fields) {
		if(error){
			console.log(error);
		}
		var retjson = {"code":0,"msg":"ok"};
		//res.json(JSON.stringify(retjson));
		res.send(JSON.stringify(retjson));
        res.end('is over');
		console.log('Query delete over ');
	});
	console.log("first here"); 
});

module.exports = router;
