/*
 *	PK4YO Co. Ltd.
 *  Author: Zhang Hui <spacetiller@163.com>
 *  Time: Dec. 2018
 *  All Copyrights Reserved.
 */
var express = require('express');
var router = express.Router();
var conn = require('../common/database');
var Verify= require('../../models/verify/verify.js');

var verify = new Verify();

const table_name = verify.table_name; 
const table_cols = verify.table_cols;

//console.log(table_name);

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

/*
 * sendverify
 */
router.get('/sendverify', function(req, res, next) {
	var retjson = {"code":0,"msg":"ok"};
	var cbfunc = function(error, results, fields) {
		if(error){
			console.log(error);
		}
		retjson.veriId = results?results.insertId:'-1';
		res.send(JSON.stringify(retjson));
        //res.end('is over');
		console.log(table_name + ' sql add over ');
	};
	console.log(req.query);
	var phone = req.query['mobile']; 
	var code = 1000 + parseInt(8999*Math.random());
	var ts = parseInt(Date.now()/1000);

	req.query['code'] = code;
	req.query['timestamp'] = ts;
	req.query['phone'] = parseInt(phone);

	var http = require('http');  
	var qs = require('querystring'); 
	const crypto = require('crypto');
	const hash = crypto.createHash('md5');
	// 可任意多次调用update():
	hash.update(code.toString());
	var magic = hash.digest('hex').substr(16);
	//console.log(magic);
 
	var data = {  
	    phone: phone, 
	    code: code,  
	    minutes: 5,  
		magic: magic
	};
	var content = qs.stringify(data);  
	console.log(content);
	var options = {  
	    hostname: 'sendsms.pk4yo.com',  
	    port: 80,  
	    path: '/sms.php?' + content,  
	    method: 'GET'  
	};  
	var reqsms = http.request(options, function (resms) {  
	    console.log('STATUS: ' + resms.statusCode);  
	    //console.log('HEADERS: ' + JSON.stringify(res.headers));  
	    resms.setEncoding('utf8');  
	    resms.on('data', function (data) {  
	        console.log('BODY: ' + data.trim() + '-' + data.trim().length); 
			if(data.trim() == '0'){
				conn.addOne(req, table_name, cbfunc);
				console.log(table_name + " sql add first here"); 
			} else {
				res.send(JSON.stringify(retjson));
				console.log(table_name + ' sql add over ');
			}
	    });  
	});  
	reqsms.on('error', function (e) {  
	    console.log(table_name + ' problem with sms.php: ' + e.message);  
	});  
	reqsms.end();  

});

/*
 * verify
 */
router.get('/verify', function(req, res, next) {
	var retjson = {"code":0,"pass":false,"msg":""};
	var cbfunc = function(error, results, fields) {
		if(error){
			console.log(error);
		}
		if(results.length > 0){
			//retjson.data = results;
			var ts = results[0].timestamp;
			var tsnow = parseInt(Date.now()/1000);
			if(tsnow - ts < 300) retjson.pass = true;
		}
		res.send(JSON.stringify(retjson));
		console.log(table_name + ' one by cond json sent over. ');
	};
	conn.queryList(req, table_name, cbfunc);
	console.log(table_name + " get one by id and code first here"); 
});

/*
 * add one, if condition record not exist
 */
router.get('/addifnotexist', function(req, res, next) {
	var retjson = {"code":0,"msg":"ok"};
	var cbfunc = function(error, results, fields) {
		if(error){
			console.log(error);
		}
		if(results.length == 0){
			var cbfunc1 = function(error, results, fields) {
				if(error){
					console.log(error);
				}
				retjson.hbId = results?results.insertId:'-1';
				res.send(JSON.stringify(retjson));
    		    //res.end('is over');
				console.log('sql add over');
			};
			conn.addOne(req, table_name, cbfunc1);
			console.log("sql add first here"); 

		}else{
			retjson.hbId = results[0].hbId;
			res.send(JSON.stringify(retjson));
			console.log('sql query over');
		}
		//res.send(JSON.stringify(retjson));
		console.log('condition listing json sent over. ');
	};
	conn.queryList(req, table_name, cbfunc);
	console.log("condition listing first here"); 
	
});

/* 
 *	update one
 */
router.get('/update', function(req, res, next) {
	var retjson = {"code":0,"msg":"ok"};
	var cbfunc = function(error, results, fields) {
		if(error){
			console.log(error);
		}
		res.send(JSON.stringify(retjson));
		console.log('sql update over: ');
        //res.end('is over');
		//console.log('connected as id ' + conn.threadId);
		//conn.releaseConnection();
	};
	conn.updateOne(req, table_name, cbfunc);
	console.log("sql update first here"); 
});

/* 
 *	delete one
 */
router.get('/delete', function(req, res, next) {
	var retjson = {"code":0,"msg":"ok"};
	var cbfunc = function(error, results, fields) {
		if(error){
			console.log(error);
		}
		//res.json(JSON.stringify(retjson));
        //res.end('is over');
		res.send(JSON.stringify(retjson));
		console.log('sql delete over ');
	};
	conn.deleteOne(req, table_name, cbfunc);
	console.log("sql delete first here"); 
});

module.exports = router;
