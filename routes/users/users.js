/*
 *	PK4YO Co. Ltd.
 *  Author: Zhang Hui <spacetiller@163.com>
 *  Time: Dec. 2018
 *  All Copyrights Reserved.
 */
var express = require('express');
var router = express.Router();
var conn = require('../common/database');
var https = require('https');
var Pkuser = require('../../models/pkuser/pkuser.js');

var pkuser = new Pkuser();

const table_name = pkuser.table_name; 
const table_cols = pkuser.table_cols;

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

/* Login
 *
 */
router.post('/login', function(req, res, next) {
	var sql_insert = 'insert into ' + table_name + ' set ?';
	var post = {};
	var login = false;
	var retjson = {"code":0,"userId":-1,"msg":""};

	console.log('----------- user login -----------');
	if(true){
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
	}
	if(req.body && req.body['code']){
		post['js_code'] = req.body['code'];
	}
	console.log(post);

	if(post['openid'] && post['openid'].length > 5){
			// find user existence
    		var cbfunc = function(error, results, fields) {  // L3: find user
    		    if(error){
    		        console.log(error);
    		    }   
    		    if(results.length > 0){ 	// find user 
					console.log(results);
    		        retjson.userId = results[0].userId;
    		        retjson.openid = results[0].openid;
    	    		res.send(JSON.stringify(retjson));
    		    } else { 	// no user, register
					conn.query(sql_insert, post, function(error, results, fields) {  // L4: insert user
						if(error){
							console.log(error);
						}
						console.log(results);
						retjson.userId = results?results.insertId:'-1';
						retjson.openid = results?results.openid:'-1';
						res.send(JSON.stringify(retjson));
    				    //res.end('is over');
						console.log('user register over 1');
						return;
					});
					console.log("sql add first here 1"); 
				}
    		    //res.send(JSON.stringify(retjson));
    		    console.log('find user by openid json sent over. 1');
    		};  
    		//conn.queryOneById(req, table_name, cbfunc);
    		conn.queryOneByCol(req, table_name, 'openid', cbfunc);

	} else {
		// code2session
		var appID = 'wx7703e7582335f2be';
		var secret = '98cad5a162c99f33061c89c00bd95a52';
		url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appID + '&secret=' + secret + '&js_code=' + post['js_code'] + '&grant_type=authorization_code';
		console.log(url);
	    https.get(url, (resp) => {
	        //    res.send(JSON.stringify({openid:data.openid,session_key:data.session_key}));
	        resp.on("data",(data)=>{  // L2: receive data
	    	    console.log(data.toString());
	    	    //res.send(JSON.stringify(data));
				//JSON.parse(data.toString())
				var json = JSON.parse(data.toString());
				post["openid"] = json.openid;
				req.body["openid"] = json.openid;
				post["session_key"] = json.session_key;
				//console.log(post);
				//console.log(req.body);
	    	
				if(json.openid == undefined){
					retjson.code = -1;
					retjson.msg = "wx openid get fail";
	    	    	res.send(JSON.stringify(retjson));
					return;
				}
	
				// find user existence
	    		var cbfunc = function(error, results, fields) {  // L3: find user
	    		    if(error){
	    		        console.log(error);
	    		    }   
	    		    if(results.length > 0){ 	// find user 
						console.log(results);
	    		        retjson.userId = results[0].userId;
	    		        retjson.openid = results[0].openid;
	    	    		res.send(JSON.stringify(retjson));
	    		    } else { 	// no user, register
						conn.query(sql_insert, post, function(error, results, fields) {  // L4: insert user
							if(error){
								console.log(error);
							}
							console.log(results);
							retjson.userId = results?results.insertId:'-1';
							retjson.openid = results?results.openid:'-1';
							res.send(JSON.stringify(retjson));
	    				    //res.end('is over');
							console.log('user register over ');
							return;
						});
						console.log("sql add first here"); 
					}
	    		    //res.send(JSON.stringify(retjson));
	    		    console.log('find user by openid json sent over. ');
	    		};  
	    		//conn.queryOneById(req, table_name, cbfunc);
	    		conn.queryOneByCol(req, table_name, 'openid', cbfunc);
	
	    	});
	    	resp.on("end",()=>{
	    	    console.log('jscode2session:   eeeeennnnnddddd');
			});
		}).on("error",(e) => {
			console.log('jscode2session 获取数据失败: ${e.message}');
		});
		//res.send(JSON.stringify(post));
		//return;
	} 

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
