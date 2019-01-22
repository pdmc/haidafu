/*
 *	PK4YO Co. Ltd.
 *  Author: Zhang Hui <spacetiller@163.com>
 *  Time: Dec. 2018
 *  All Copyrights Reserved.
 */
var express = require('express');
var router = express.Router();
var conn = require('../common/database');
var Reservation = require('../../models/reservation/reservation.js');

var reservation = new Reservation();

const table_name = reservation.table_name; //'pkproject';
const table_cols = reservation.table_cols; //'pkproject';

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
		if(true){
			res.setHeader("Access-Control-Allow-Origin", "*");
		}
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
		if(results && results.length > 0){
			retjson.data = results;
		}
		if(true){
			res.setHeader("Access-Control-Allow-Origin", "*");
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
		if(true){
			res.setHeader("Access-Control-Allow-Origin", "*");
		}
		res.send(JSON.stringify(retjson));
		console.log('one by id json sent over. ');
	};
	conn.queryOneById(req, table_name, cbfunc);
	console.log("get one by id first here"); 
});

/*
 * add one
 */
router.get('/add', function(req, res, next) {
	var retjson = {"code":0,"msg":"ok"};
	var hbid = -1;

	cbfunc = function(error, results, fields) {
		if(error){
			console.log(error);
		}
		retjson.rId = results?results.insertId:'-1';
		retjson.hbId = hbid;	// 此处应该等待 hongbao 回调函数返回
		if(true){
			res.setHeader("Access-Control-Allow-Origin", "*");
		}
		res.send(JSON.stringify(retjson));
        //res.end('is over');
		console.log(table_name + ': reservation add over ');
	};
	conn.addOne(req, table_name, cbfunc);
});

/*
 * add one
 */
router.get('/addwithhb', function(req, res, next) {
	var retjson = {"code":0,"msg":"ok"};
	var hbid = -1;

	var cbfunc = function(error, results, fields) {
		if(error){
			console.log(error);
		}
		hbid = results?results.insertId:'-1';
		console.log('reservation: hongbao add over, id: ' + hbid);
	};
	conn.addOne(req, "hongbao", cbfunc);
	console.log(table_name + ': hongbao add first here'); 
	
	cbfunc = function(error, results, fields) {
		if(error){
			console.log(error);
		}
		console.log(table_name + ': user update over ');
	};
	conn.updateOne(req, 'pkuser', cbfunc);

	cbfunc = function(error, results, fields) {
		if(error){
			console.log(error);
		}
		retjson.rId = results?results.insertId:'-1';
		retjson.hbId = hbid;	// 此处应该等待 hongbao 回调函数返回
		if(true){
			res.setHeader("Access-Control-Allow-Origin", "*");
		}
		res.send(JSON.stringify(retjson));
        //res.end('is over');
		console.log(table_name + ': reservation add over ');
	};
	conn.addOne(req, table_name, cbfunc);
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
		if(true){
			res.setHeader("Access-Control-Allow-Origin", "*");
		}
		if(results.length == 0){
			var cbfunc1 = function(error, results, fields) {
				if(error){
					console.log(error);
				}
				retjson.rId = results?results.insertId:'-1';
				res.send(JSON.stringify(retjson));
    		    //res.end('is over');
				console.log(table_name + ': sql add over');
			};
			conn.addOne(req, table_name, cbfunc1);
			console.log(table_name + ': sql add first here'); 

		}else{
			retjson.rId = results[0].rId;
			res.send(JSON.stringify(retjson));
			console.log(table_name + ': sql query over');
		}
		//res.send(JSON.stringify(retjson));
		console.log(table_name + ': condition listing json sent over. ');
	};
	conn.queryList(req, table_name, cbfunc);
	console.log(table_name + ': condition listing first here'); 
});

/*
 * add one, if condition record not exist
 */
router.get('/addwithhbifnotexist', function(req, res, next) {
	var retjson = {"code":0,"msg":"ok"};
	if(true){
		res.setHeader("Access-Control-Allow-Origin", "*");
	}
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
				//res.send(JSON.stringify(retjson));
    		    //res.end('is over');
				console.log('hongbao: sql add over');
			};
			conn.addOne(req, "hongbao", cbfunc1);
			console.log("hongbao: sql add first here"); 

		}else{
			retjson.hbId = results[0].hbId;
			res.send(JSON.stringify(retjson));
			console.log('hongbao: sql query over');
		}
		//res.send(JSON.stringify(retjson));
		console.log('hongbao: condition listing json sent over. ');
	};
	conn.queryList(req, "hongbao", cbfunc);
	console.log("hongbao: condition listing first here"); 
	
	cbfunc = function(error, results, fields) {
		if(error){
			console.log(error);
		}
		console.log('reservation: user update over ');
	};
	conn.updateOne(req, 'pkuser', cbfunc);

	var cbfunc = function(error, results, fields) {
		if(error){
			console.log(error);
		}
		if(results.length == 0){
			var cbfunc1 = function(error, results, fields) {
				if(error){
					console.log(error);
				}
				retjson.rId = results?results.insertId:'-1';
				res.send(JSON.stringify(retjson));
    		    //res.end('is over');
				console.log(table_name + ': sql add over');
			};
			conn.addOne(req, table_name, cbfunc1);
			console.log(table_name + ': sql add first here'); 

		}else{
			retjson.rId = results[0].rId;
			res.send(JSON.stringify(retjson));
			console.log(table_name + ': sql query over');
		}
		//res.send(JSON.stringify(retjson));
		console.log(table_name + ': condition listing json sent over. ');
	};
	conn.queryList(req, table_name, cbfunc);
	console.log(table_name + ': condition listing first here'); 	
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
		if(true){
			res.setHeader("Access-Control-Allow-Origin", "*");
		}
		res.send(JSON.stringify(retjson));
		console.log(table_name + ': sql update over: ');
        //res.end('is over');
		//console.log('connected as id ' + conn.threadId);
		//conn.releaseConnection();
	};
	conn.updateOne(req, table_name, cbfunc);
	console.log(table_name + ': sql update first here'); 
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
		if(true){
			res.setHeader("Access-Control-Allow-Origin", "*");
		}
		res.send(JSON.stringify(retjson));
		console.log(table_name + ': sql delete over ');
	};
	conn.deleteOne(req, table_name, cbfunc);
	console.log(table_name + ': sql delete first here'); 
});

module.exports = router;
