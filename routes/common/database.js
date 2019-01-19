/*
 *	PK4YO Co. Ltd.
 *  Author: Zhang Hui <spacetiller@163.com>
 *  Time: Dec. 2018
 *  All Copyrights Reserved.
 */
var express = require('express');
var mysql  = require('mysql');  
var config = require('../../config/database');
var pool  = mysql.createPool(config.dbconfig);

pool.cc = config;

/*
 * condition: '': select one record, so concate xxID = ? at end
 *            ' area = xxx ': select list record, so concate condition string at end
 *
 */
function __prepare_select_sql(model_table, table_name, condition, options){
	console.log('--- enter __prepare_select_sql ---');
	var sql = 'SELECT DISTINCT ';
	var hasContain = false;

	//console.log(model_table);
	//console.log(model_table.table_cols);
	if(options != null && options.hasContain != undefined && options.hasContain) {
		hasContain = true;
	}

	// prepare sql sentence
	// 1. main table
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
		//retjson.code = 1;
		//retjson.msg = 'cross table checked error';
		//res.send(JSON.stringify(retjson));
		return '';
	}
	
	// 2. query table columns
	model_table.table_cross_name.forEach(function(v,i,arr){	 // 1 查询表循环
		if(Array.isArray(model_table.table_cross_fkey[i]) && model_table.table_cross_fkey[i].length > 1){
			model_table.table_cross_fkey[i].forEach(function(y,l,arr2){	 // 2 多外键对应一个查询表循环
				model_table.table_cross_cols[i].forEach(function(w,j,array){		// 3 查询表 多列循环
					if(model_table.table_cross_cols[i][j].fkey){
						model_table.table_cross_cols[i][j].cols.forEach(function(x,k,array2){	   // 4 查询表 外键 嵌套查询表循环
							sql = sql + ', ' + model_table.table_cross_name[i] + '__' + model_table.table_cross_fkey[i][l] + '__' + model_table.table_cross_cols[i][j].table + '.' + model_table.table_cross_cols[i][j].cols[k] + ' AS ' + model_table.table_cross_column_as[i][l][j][k];
						});
					}else{
						sql = sql + ', ' + model_table.table_cross_name[i] + '__' + model_table.table_cross_fkey[i][l] + '.' + model_table.table_cross_cols[i][j] + ' AS ' + model_table.table_cross_column_as[i][l][j];
					}
				}); 
			});
		}else{		//if(model_table.table_cross_fkey[]
			//model_table.table_cross_cols[i].forEach(function(w,j,array){});
			model_table.table_cross_cols[i].forEach(function(w,j,array){
				if(model_table.table_cross_cols[i][j].fkey){
					model_table.table_cross_cols[i][j].cols.forEach(function(x,k,array2){
						sql = sql + ', ' + model_table.table_cross_cols[i][j].fkey + '__' + model_table.table_cross_cols[i][j].table + '.' + model_table.table_cross_cols[i][j].cols[k] + ' AS ' + model_table.table_cross_column_as[i][j][k];
					});
				}else{
					sql = sql + ', ' + model_table.table_cross_name[i] + '.' + model_table.table_cross_cols[i][j] + ' AS ' + model_table.table_cross_column_as[i][j];
					//sql = sql + ', ' + model_table.table_cross_fkey[i] + '__' + model_table.table_cross_name[i] + '.' + model_table.table_cross_cols[i][j] + ' AS ' + model_table.table_cross_column_as[i][j];
				}
			});
		}
	});
	if(model_table.table_contain_name != undefined && model_table.table_contain_name.length > 0 && hasContain){
		model_table.table_contain_name.forEach(function(v,i,arr){
			if(model_table.table_cross_name.indexOf(model_table.table_contain_name[i]) >= 0)
				return;
			model_table.table_contain_cols[i].forEach(function(w,j,arr2){
				sql = sql + ', ' + model_table.table_contain_name[i] + '.' + model_table.table_contain_cols[i][j] + ' AS ' + model_table.table_contain_name[i] + '__' + model_table.table_contain_cols[i][j];
			});
		});
	}
	//console.log(sql);
	
	// 3. query table names
	sql = sql + ' FROM ' + model_table.table_name;
	model_table.table_cross_name.forEach(function(v,i,arr){
		if(Array.isArray(model_table.table_cross_fkey[i]) && model_table.table_cross_fkey[i].length > 1){
			model_table.table_cross_fkey[i].forEach(function(y,l,arr2){
				sql = sql + ', (select * from ' + model_table.table_cross_name[i] + ') as ' + model_table.table_cross_name[i]  + '__' + model_table.table_cross_fkey[i][l];
				model_table.table_cross_cols[i].forEach(function(w,j,array){
					if(model_table.table_cross_cols[i][j].fkey){
						sql = sql + ', (select * from ' + model_table.table_cross_cols[i][j].table + ') as ' + model_table.table_cross_name[i] + '__' + model_table.table_cross_fkey[i][l] + '__' + model_table.table_cross_cols[i][j].table;
					}
				});
			});
		}else{
			sql = sql + ', ' + model_table.table_cross_name[i];
			//sql = sql + ', (select * from ' + model_table.table_cross_name[i]+ ') as ' + model_table.table_cross_fkey[i] + '__' + model_table.table_cross_name[i];
			model_table.table_cross_cols[i].forEach(function(w,j,array){
				if(model_table.table_cross_cols[i][j].fkey){
					sql = sql + ', (select * from ' + model_table.table_cross_cols[i][j].table + ') as ' +  model_table.table_cross_cols[i][j].fkey + '__' + model_table.table_cross_cols[i][j].table;
				}
			});
		}
	});
	if(model_table.table_contain_name != undefined && model_table.table_contain_name.length > 0 && hasContain){
		model_table.table_contain_name.forEach(function(v,i,arr){
			if(model_table.table_cross_name.indexOf(model_table.table_contain_name[i]) >= 0)
				return;
			sql = sql + ', ' + model_table.table_contain_name[i];
		});
	}
	//console.log(sql);
	
	// 4. query correlative query
	sql = sql + ' WHERE ';
	model_table.table_cross_name.forEach(function(v,i,arr){
		if(Array.isArray(model_table.table_cross_fkey[i]) && model_table.table_cross_fkey[i].length > 1){
			model_table.table_cross_fkey[i].forEach(function(y,l,arr2){
				sql = sql + model_table.table_name + '.' + model_table.table_cross_fkey[i][l] + ' = ' + model_table.table_cross_name[i] + '__' + model_table.table_cross_fkey[i][l] + '.' + model_table.table_cross_cols[i][0] + ' AND ';
				model_table.table_cross_cols[i].forEach(function(w,j,array){
					if(model_table.table_cross_cols[i][j].fkey){
						sql = sql + model_table.table_cross_name[i] + '__' + model_table.table_cross_fkey[i][l] + '__' + model_table.table_cross_cols[i][j].table + '.' + model_table.table_cross_cols[i][j].cols[0] + ' = ' + model_table.table_cross_name[i] + '__' + model_table.table_cross_fkey[i][l] + '.' + model_table.table_cross_cols[i][j].fkey + ' AND ';
					}
				});
			});
		}else{
			sql = sql + model_table.table_name + '.' + model_table.table_cross_fkey[i] + ' = ' + model_table.table_cross_name[i] + '.' + model_table.table_cross_cols[i][0] + ' AND ';
			//sql = sql + model_table.table_name + '.' + model_table.table_cross_fkey[i] + ' = ' + model_table.table_cross_fkey[i] + '__' + model_table.table_cross_name[i] + '.' + model_table.table_cross_cols[i][0] + ' AND ';
			model_table.table_cross_cols[i].forEach(function(w,j,array){
				if(model_table.table_cross_cols[i][j].fkey){
					sql = sql + model_table.table_cross_cols[i][j].fkey + '__' + model_table.table_cross_cols[i][j].table + '.' + model_table.table_cross_cols[i][j].cols[0] + ' = ' + model_table.table_cross_name[i] + '.' + model_table.table_cross_cols[i][j].fkey + ' AND ';
				}
			});
		}
	});
	if(model_table.table_contain_name != undefined && model_table.table_contain_name.length > 0 && hasContain){
		model_table.table_contain_name.forEach(function(v,i,arr){
			if(model_table.table_cross_name.indexOf(model_table.table_contain_name[i]) >= 0)
				return;
			sql = sql + model_table.table_name + '.' + model_table.table_cols[0] + ' = ' + model_table.table_contain_name[i] + '.' + model_table.table_contain_fkey[i] + ' AND ';
		});
	}
	
	// 5. condition
	if(condition.length == 0){
		sql = sql + model_table.table_name + '.' + model_table.table_cols[0] + ' = ?';
	}else{
		sql = sql + condition;
	}
	console.log(sql);
	
	return sql;
}

pool.queryOneById = function(req, table_name, callback){
	console.log('--- enter pool.queryOneById ---');
	var ModelTable = require('../../models/' + table_name + '/' + table_name + '.js');
	var model_table = new ModelTable();
	var sql = __prepare_select_sql(model_table, table_name, '', null);
	var sql_params = [0];
	
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
	//console.log("first here"); 
};

pool.queryOneByCol = function(req, table_name, col_name, callback){
	console.log('--- enter pool.queryOneById ---');
	var ModelTable = require('../../models/' + table_name + '/' + table_name + '.js');
	var model_table = new ModelTable();
	var cond = table_name + '.' + col_name + ' = ?';
	var sql = __prepare_select_sql(model_table, table_name, cond, null);
	var sql_params = [0];
	
	//	prepare param values
	if(req.params && req.params[col_name]){
		sql_params[0] = req.params[col_name];
	}else if(req.query && req.query[col_name]){
		sql_params[0] = req.query[col_name];
	}else if(req.body && req.body[col_name]){
		sql_params[0] = req.body[col_name];
	}

	//	execute sql
	pool.query(sql,sql_params,callback);
	//console.log("first here"); 
};

pool.queryList = function(req, table_name, callback){
	console.log('--- enter pool.queryList ---');
	var ModelTable = require('../../models/' + table_name + '/' + table_name + '.js');
	var model_table = new ModelTable();
	var sql = '';
	var cond = '';
	var sql_params = [0];
	var index = 0;
	var hasContain = false;

	//console.log(req);
	//	prepare param values
	model_table.table_cols.forEach(function(v,i,arr){
		var ci = -1;
		if(model_table.condition_range != undefined && model_table.condition_range.length > 0)
			ci = model_table.condition_range.indexOf(model_table.table_cols[i]);
		if(req.params && req.params[model_table.table_cols[i]]){
			sql_params[index] = req.params[model_table.table_cols[i]];
			if(ci >= 0 && ci % 2 == 0) {	// min
				//cond = cond + model_table.table_name + '.' + model_table.table_cols[i] + ' >= ? AND ';
				cond = cond + model_table.table_name + '.' + model_table.condition_range[ci+1] + ' >= ? AND ';
			} else if(ci >= 0 && ci % 2 == 1) {	// max
				cond = cond + model_table.table_name + '.' + model_table.condition_range[ci-1] + ' <= ? AND ';
			} else {
				cond = cond + model_table.table_name + '.' + model_table.table_cols[i] + ' = ? AND ';
			}
			index ++;
		}else if(req.query && req.query[model_table.table_cols[i]]){
			sql_params[index] = req.query[model_table.table_cols[i]];
			if(ci >= 0 && ci % 2 == 0) {	// min
				cond = cond + model_table.table_name + '.' + model_table.condition_range[ci+1] + ' >= ? AND ';
			} else if(ci >= 0 && ci % 2 == 1) {	// max
				cond = cond + model_table.table_name + '.' + model_table.condition_range[ci-1] + ' <= ? AND ';
			} else {
				cond = cond + model_table.table_name + '.' + model_table.table_cols[i] + ' = ? AND ';
			}
			//cond = cond + model_table.table_name + '.' + model_table.table_cols[i] + ' = ? AND ';
			index ++;
		}else if(req.body && req.body[model_table.table_cols[i]]){
			sql_params[index] = req.body[model_table.table_cols[i]];
			if(ci >= 0 && ci % 2 == 0) {	// min
				cond = cond + model_table.table_name + '.' + model_table.condition_range[ci+1] + ' >= ? AND ';
			} else if(ci >= 0 && ci % 2 == 1) {	// max
				cond = cond + model_table.table_name + '.' + model_table.condition_range[ci-1] + ' <= ? AND ';
			} else {
				cond = cond + model_table.table_name + '.' + model_table.table_cols[i] + ' = ? AND ';
			}
			//cond = cond + model_table.table_name + '.' + model_table.table_cols[i] + ' = ? AND ';
			index ++;
		}
	});
	if(model_table.table_contain_name != undefined && model_table.table_contain_name.length > 0){	// 检查包含表的条件
		model_table.table_contain_name.forEach(function(v,i,arr){
			model_table.table_contain_cols[i].forEach(function(w,j,arr2){
				if(req.params && req.params[model_table.table_contain_name[i] + '__' + model_table.table_contain_cols[i][j]]){
					sql_params[index] = req.params[model_table.table_contain_name[i] + '__' + model_table.table_contain_cols[i][j]];
					cond = cond + model_table.table_contain_name[i] + '.' + model_table.table_contain_cols[i][j] + ' = ? AND ';
					index ++;
					hasContain = true;
				}else if(req.query && req.query[model_table.table_contain_name[i] + '__' + model_table.table_contain_cols[i][j]]){
					sql_params[index] = req.query[model_table.table_contain_name[i] + '__' + model_table.table_contain_cols[i][j]];
					cond = cond + model_table.table_contain_name[i] + '.' + model_table.table_contain_cols[i][j] + ' = ? AND ';
					index ++;
					hasContain = true;
				}else if(req.body && req.body[model_table.table_contain_name[i] + '__' + model_table.table_contain_cols[i][j]]){
					sql_params[index] = req.body[model_table.table_contain_name[i] + '__' + model_table.table_contain_cols[i][j]];
					cond = cond + model_table.table_contain_name[i] + '.' + model_table.table_contain_cols[i][j] + ' = ? AND ';
					index ++;
					hasContain = true;
				}
			});
		});
	}
	//console.log(index);
	//console.log(sql_params);

	cond += ' 1=1 ';	// compatible with sql end ' AND '
	
	sql = __prepare_select_sql(model_table, table_name, cond, {'hasContain': hasContain});
	
	//	execute sql
	pool.query(sql,sql_params,callback);
	//console.log("first here"); 
};

pool.addOne = function(req, table_name, callback) {
	console.log('--- enter pool.addOne ---');
	var ModelTable = require('../../models/' + table_name + '/' + table_name + '.js');
	var model_table = new ModelTable();
	var table_cols = model_table.table_cols;
    var sql = 'insert into ' + table_name + ' set ?';
    var post = {}; 

	//console.log(req.query);
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
    console.log(sql);
    console.log(post);
	pool.query(sql, post, callback);
    //console.log("sql add first here"); 
};

pool.updateOne = function(req, table_name, callback) {
	console.log('--- enter pool.updateOne ---');
	var ModelTable = require('../../models/' + table_name + '/' + table_name + '.js');
	var model_table = new ModelTable();
	var table_cols = model_table.table_cols;
    var sql = 'UPDATE ' + table_name + ' SET ' ;
    var sql_params = ['',0];

    var col_len = table_cols.length;

    var update_i = 0;
    //console.log(req.query);
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
    //console.log(sql_params);
	pool.query(sql, sql_params, callback);
    //console.log("sql update first here");
};

pool.deleteOne = function(req, table_name, callback) {
	console.log('--- enter pool.deleteOne ---');
	var ModelTable = require('../../models/' + table_name + '/' + table_name + '.js');
	var model_table = new ModelTable();
	var table_cols = model_table.table_cols;
    var sql = 'delete from ' + table_name + ' WHERE ' + table_cols[0] + ' = ?';
    var sql_params = [0];

    if(req.params && req.params[table_cols[0]]){
        sql_params[0] = req.params[table_cols[0]];
    }else if(req.query && req.query[table_cols[0]]){
        sql_params[0] = req.query[table_cols[0]];
    }else if(req.body && req.body[table_cols[0]]){
        sql_params[0] = req.body[table_cols[0]];
    }   
    console.log(sql);
    console.log(sql_params);
	pool.query(sql, sql_params, callback);
    //console.log("sql delete first here"); 
};

module.exports = pool;


