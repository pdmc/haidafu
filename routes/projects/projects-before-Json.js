var express = require('express');
var router = express.Router();
//var app = express();
var conn = require('../common/database');

const table_name = 'pkproject';
const table_cols = ['pId','pName','status','minSquare','maxSquare','minPrice','maxPrice','countryId','proviceId','cityId','districtId','fullAddr','prightLimit','handoverYear','handoverMonth','handoverDay','canLoan','totalSquare','totalAmount','predictYearRent','localPricePic','picture1','picture2','picture3','thumbnail','description'];

// 以下4个变量的长度必须一致！！！
const table_cross_fkey = [['countryId'],['pId']];	
// 每个查询外边，对应上面的外键组 以及 下面的查询列
const table_cross_name = ['area','houselayout'];	
// 查询列必须以对应外键的ID作为第一个，后面是查询的值列，不限个数
// 2018.12.17 加入二级关联，在关联表中如果还有需要翻译的关联字段，则将这个字段翻译成对象，：{fkey: typeId, table: 'type', cols: [ 'id', 'name' ]}
const table_cross_cols = [['addrId','name'],
						  ['pId','livingroomNum','bedroomNum','bathroomNum',
						   {fkey:'typeId', table: 'housetype', cols: [ 'typeId', 'name' ]},	// 可能的错误：关联表需要额外where条件
						   {fkey:'fitmentId', table: 'fitmenttype', cols: [ 'ftId', 'name' ]},	// 可能的错误：关联表需要额外where条件
						   'hlSquare','picture1']
						 ];	
var table_cross1_value_column_as = []; 	//'table_cross_value_column'; // 返回值列一一对应上面的查询列，在运行后填充，为：表名+双下划线+列名，如 area__name

var table_cross_checked = false;

//console.log('ttttteeessssstttttt code procedure');

function check_table_cross(){
	if(table_cross_fkey.length != table_cross_name.length || table_cross_name.length != table_cross_cols.length){
		console.log("check_table_cross:  cross table related array not corresponding, check it !!!"); 
		return false;
	}
	table_cross_name.forEach(function(v,i,arr){
		//console.log(table_cross_name[i]);
		if(table_cross_cols[i].length < 2){
			console.log("check_table_cross:  table_cross_cols contains length < 2, must be id + value 2 columns at least !!!"); 
			return false;
		}
		table_cross1_value_column_as[i] = []	// in case of TypeError: Cannot set property '0' of undefined
		table_cross_cols[i].forEach(function(w,j,array){
			if(table_cross_cols[i][j].fkey){
				table_cross1_value_column_as[i][j] = []
				table_cross_cols[i][j].cols.forEach(function(x,k,array2){
					table_cross1_value_column_as[i][j][k] = table_cross_cols[i][j].table + '__' + table_cross_cols[i][j].cols[k];
				});
			}else{
				//console.log(table_cross_cols[i][j]);
				table_cross1_value_column_as[i][j] = table_cross_name[i] + '__' + table_cross_cols[i][j];
			}
		});
	});
	console.log(__filename);
	console.log("check_table_cross:  table_cross_name arrays checked !!! ");
	console.log(table_cross1_value_column_as);
	table_cross_checked = true;
	return true;
}
check_table_cross();


/* GET types listing. */
router.get('/', function(req, res, next) {
 	var rets = '';
	var sql = 'SELECT * FROM ' + table_name + '';
	//
	conn.query(sql,function(error, results, fields) {
		if(error){
			console.log(error);
		}
		var retjson = {"code":0,"data":[]};
		if(results.length > 0){
			retjson.data = results;
		}
		//res.json(JSON.stringify(retjson));
		res.send(JSON.stringify(retjson));
        res.end('is over');
		console.log('json sent over. ');
	});
	console.log("first here"); 
});

/* GET types listing. */
router.get('/getbyid', function(req, res, next) {
 	var rets = '';
	var sql = 'SELECT ';
	var sql_params = [0];
	var retjson = {"code":0,"data":[]};

	// prepare sql sentence
	table_cols.forEach(function(v,i,arr){
		//console.log('-- foreach ', i ,' -- ');
		if(i != 0){
			sql = sql + ', ' + table_name + '.' + table_cols[i];
		}else{
			sql = sql + table_name + '.' + table_cols[i];
		}
	});
	//console.log(sql);
	if(!table_cross_checked && !check_table_cross()){
		retjson.code = 1;
		retjson.msg = 'cross table checked error';
		res.send(JSON.stringify(retjson));
		return;
	}
	//console.log(sql);
	table_cross_name.forEach(function(v,i,arr){
		table_cross_cols[i].forEach(function(w,j,array){
			if(table_cross_cols[i][j].fkey){
				table_cross_cols[i][j].cols.forEach(function(x,k,array2){
					sql = sql + ', ' + table_cross_cols[i][j].table + '.' + table_cross_cols[i][j].cols[k] + ' AS ' + table_cross1_value_column_as[i][j][k];
				});
			}else{
				sql = sql + ', ' + table_cross_name[i] + '.' + table_cross_cols[i][j] + ' AS ' + table_cross1_value_column_as[i][j];
			}
		});
	});
	//console.log(sql);
	sql = sql + ' FROM ' + table_name;
	table_cross_name.forEach(function(v,i,arr){
		sql = sql + ', ' + table_cross_name[i];
		table_cross_cols[i].forEach(function(w,j,array){
			if(table_cross_cols[i][j].fkey){
				sql = sql + ', ' + table_cross_cols[i][j].table;
			}
		});
	});
	//console.log(sql);
	sql = sql + ' WHERE ';
	table_cross_name.forEach(function(v,i,arr){
		sql = sql + table_name + '.' + table_cross_fkey[i] + ' = ' + table_cross_name[i] + '.' + table_cross_cols[i][0] + ' AND ';
		table_cross_cols[i].forEach(function(w,j,array){
			if(table_cross_cols[i][j].fkey){
				sql = sql + table_cross_cols[i][j].table + '.' + table_cross_cols[i][j].cols[0] + ' = ' + table_cross_name[i] + '.' + table_cross_cols[i][j].fkey + ' AND ';
			}
		});
	});
	sql = sql + table_name + '.' + table_cols[0] + ' = ?';
	console.log(sql);
	
	//	prepare param values
	if(req.params && req.params[table_cols[0]]){
		sql_params[0] = req.params[table_cols[0]];
	}else if(req.query && req.query[table_cols[0]]){
		sql_params[0] = req.query[table_cols[0]];
	}else if(req.body && req.body[table_cols[0]]){
		sql_params[0] = req.body[table_cols[0]];
	}
	
	//	execute sql
	conn.query(sql,sql_params,function(error, results, fields) {
		if(error){
			console.log(error);
		}
		if(results.length > 0){
			retjson.data = results;
		}
		//res.json(JSON.stringify(retjson));
		res.send(JSON.stringify(retjson));
        res.end('is over');
		console.log('json sent over. ');
	});
	console.log("first here"); 
});

router.get('/add', function(req, res, next) {
 	var rets = '';
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
        res.end('is over');
		console.log('Query add over ');
	});
	console.log("first here"); 
});

router.get('/update', function(req, res, next) {
 	var rets = '';
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
        res.end('is over');
		console.log('Query update over: ');
		console.log('connected as id ' + conn.threadId);
		//conn.releaseConnection();
	});
	console.log("first here"); 
});

router.get('/delete', function(req, res, next) {
 	var rets = '';
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
		res.send(JSON.stringify(retjson));
        res.end('is over');
		console.log('Query delete over ');
	});
	console.log("first here"); 
});

module.exports = router;
