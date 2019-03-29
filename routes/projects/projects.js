/*
 *	PK4YO Co. Ltd.
 *  Author: Zhang Hui <spacetiller@163.com>
 *  Time: Dec. 2018
 *  All Copyrights Reserved.
 */
var express = require('express');
var router = express.Router();
var conn = require('../common/database');

const table_name = 'pkproject';

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
		if(results.length > 0){
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

/* POST condition listing. */
router.post('/getbycond', function(req, res, next) {
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

	var cbfunc = function(error, results, fields) {
		if(error){
			console.log(error);
		}
		retjson.pId = results?results.insertId:'-1';
		if(true){
			res.setHeader("Access-Control-Allow-Origin", "*");
		}
		res.send(JSON.stringify(retjson));
        //res.end('is over');
		console.log('sql add over ');
	};
	if(req.params && req.params['thumbname']){
	    req.params['thumbnail'] = conn.cc.config.baseimgurl + req.params['thumbname'];
	}else if(req.query && req.query['thumbname']){
	    req.query['thumbnail'] = conn.cc.config.baseimgurl + req.query['thumbname'];
	}else if(req.body && req.body['thumbname']){
	    req.body['thumbnail'] = conn.cc.config.baseimgurl + req.body['thumbname'];
	}   
	if(req.params && req.params['picture1name']){
	    req.params['picture1'] = conn.cc.config.baseimgurl + req.params['picture1name'];
	}else if(req.query && req.query['picture1name']){
	    req.query['picture1'] = conn.cc.config.baseimgurl + req.query['picture1name'];
	}else if(req.body && req.body['picture1name']){
	    req.body['picture1'] = conn.cc.config.baseimgurl + req.body['picture1name'];
	}   
	if(req.params && req.params['picture2name']){
	    req.params['picture2'] = conn.cc.config.baseimgurl + req.params['picture2name'];
	}else if(req.query && req.query['picture2name']){
	    req.query['picture2'] = conn.cc.config.baseimgurl + req.query['picture2name'];
	}else if(req.body && req.body['picture2name']){
	    req.body['picture2'] = conn.cc.config.baseimgurl + req.body['picture2name'];
	}   
	if(req.params && req.params['picture3name']){
	    req.params['picture3'] = conn.cc.config.baseimgurl + req.params['picture3name'];
	}else if(req.query && req.query['picture3name']){
	    req.query['picture3'] = conn.cc.config.baseimgurl + req.query['picture3name'];
	}else if(req.body && req.body['picture3name']){
	    req.body['picture3'] = conn.cc.config.baseimgurl + req.body['picture3name'];
	}   
	if(req.params && req.params['picture4name']){
	    req.params['picture4'] = conn.cc.config.baseimgurl + req.params['picture4name'];
	}else if(req.query && req.query['picture4name']){
	    req.query['picture4'] = conn.cc.config.baseimgurl + req.query['picture4name'];
	}else if(req.body && req.body['picture4name']){
	    req.body['picture4'] = conn.cc.config.baseimgurl + req.body['picture4name'];
	}   
	conn.addOne(req, table_name, cbfunc);
	console.log("sql add first here"); 
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
				retjson.pId = results?results.insertId:'-1';
				res.send(JSON.stringify(retjson));
    		    //res.end('is over');
				console.log('sql add over');
			};
			if(req.params && req.params['thumbname']){
			    req.params['thumbnail'] = conn.cc.config.baseimgurl + req.params['thumbname'];
			}else if(req.query && req.query['thumbname']){
			    req.query['thumbnail'] = conn.cc.config.baseimgurl + req.query['thumbname'];
			}else if(req.body && req.body['thumbname']){
			    req.body['thumbnail'] = conn.cc.config.baseimgurl + req.body['thumbname'];
			}   
			if(req.params && req.params['picture1name']){
			    req.params['picture1'] = conn.cc.config.baseimgurl + req.params['picture1name'];
			}else if(req.query && req.query['picture1name']){
			    req.query['picture1'] = conn.cc.config.baseimgurl + req.query['picture1name'];
			}else if(req.body && req.body['picture1name']){
			    req.body['picture1'] = conn.cc.config.baseimgurl + req.body['picture1name'];
			}   
			if(req.params && req.params['picture2name']){
			    req.params['picture2'] = conn.cc.config.baseimgurl + req.params['picture2name'];
			}else if(req.query && req.query['picture2name']){
			    req.query['picture2'] = conn.cc.config.baseimgurl + req.query['picture2name'];
			}else if(req.body && req.body['picture2name']){
			    req.body['picture2'] = conn.cc.config.baseimgurl + req.body['picture2name'];
			}   
			if(req.params && req.params['picture3name']){
			    req.params['picture3'] = conn.cc.config.baseimgurl + req.params['picture3name'];
			}else if(req.query && req.query['picture3name']){
			    req.query['picture3'] = conn.cc.config.baseimgurl + req.query['picture3name'];
			}else if(req.body && req.body['picture3name']){
			    req.body['picture3'] = conn.cc.config.baseimgurl + req.body['picture3name'];
			}   
			if(req.params && req.params['picture4name']){
			    req.params['picture4'] = conn.cc.config.baseimgurl + req.params['picture4name'];
			}else if(req.query && req.query['picture4name']){
			    req.query['picture4'] = conn.cc.config.baseimgurl + req.query['picture4name'];
			}else if(req.body && req.body['picture4name']){
			    req.body['picture4'] = conn.cc.config.baseimgurl + req.body['picture4name'];
			}   
			conn.addOne(req, table_name, cbfunc1);
			console.log("sql add first here"); 

		}else{
			retjson.pId = results[0].pId;
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
		if(true){
			res.setHeader("Access-Control-Allow-Origin", "*");
		}
		res.send(JSON.stringify(retjson));
		console.log('sql update over: ');
        //res.end('is over');
		//console.log('connected as id ' + conn.threadId);
		//conn.releaseConnection();
	};
	if(req.params && req.params['thumbname']){
	    req.params['thumbnail'] = conn.cc.config.baseimgurl + req.params['thumbname'];
	}else if(req.query && req.query['thumbname']){
	    req.query['thumbnail'] = conn.cc.config.baseimgurl + req.query['thumbname'];
	}else if(req.body && req.body['thumbname']){
	    req.body['thumbnail'] = conn.cc.config.baseimgurl + req.body['thumbname'];
	}   
	if(req.params && req.params['picture1name']){
	    req.params['picture1'] = conn.cc.config.baseimgurl + req.params['picture1name'];
	}else if(req.query && req.query['picture1name']){
	    req.query['picture1'] = conn.cc.config.baseimgurl + req.query['picture1name'];
	}else if(req.body && req.body['picture1name']){
	    req.body['picture1'] = conn.cc.config.baseimgurl + req.body['picture1name'];
	}   
	if(req.params && req.params['picture2name']){
	    req.params['picture2'] = conn.cc.config.baseimgurl + req.params['picture2name'];
	}else if(req.query && req.query['picture2name']){
	    req.query['picture2'] = conn.cc.config.baseimgurl + req.query['picture2name'];
	}else if(req.body && req.body['picture2name']){
	    req.body['picture2'] = conn.cc.config.baseimgurl + req.body['picture2name'];
	}   
	if(req.params && req.params['picture3name']){
	    req.params['picture3'] = conn.cc.config.baseimgurl + req.params['picture3name'];
	}else if(req.query && req.query['picture3name']){
	    req.query['picture3'] = conn.cc.config.baseimgurl + req.query['picture3name'];
	}else if(req.body && req.body['picture3name']){
	    req.body['picture3'] = conn.cc.config.baseimgurl + req.body['picture3name'];
	}   
	if(req.params && req.params['picture4name']){
	    req.params['picture4'] = conn.cc.config.baseimgurl + req.params['picture4name'];
	}else if(req.query && req.query['picture4name']){
	    req.query['picture4'] = conn.cc.config.baseimgurl + req.query['picture4name'];
	}else if(req.body && req.body['picture4name']){
	    req.body['picture4'] = conn.cc.config.baseimgurl + req.body['picture4name'];
	}   
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
		if(true){
			res.setHeader("Access-Control-Allow-Origin", "*");
		}
		res.send(JSON.stringify(retjson));
		console.log('sql delete over ');
	};
	conn.deleteOne(req, table_name, cbfunc);
	console.log("sql delete first here"); 
});

module.exports = router;
