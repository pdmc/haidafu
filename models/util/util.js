/*
 *	PK4YO Co. Ltd.
 *  Author: Zhang Hui <spacetiller@163.com>
 *  Time: 2018-12-19
 *  All Copyrights Reserved.
 */
//var express = require('express');

function check_table_cross(){
	console.log('--- enter check_table_cross ---');
	var table_cross_fkey = this.table_cross_fkey;
	var table_cross_name = this.table_cross_name;
	var table_cross_cols = this.table_cross_cols;
	var table_cross_column_as = this.table_cross_column_as;

	//console.log(this.table_cross_fkey);
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
		if(Array.isArray(table_cross_fkey[i]) && table_cross_fkey[i].length > 1){	// multiple foreign keys
			table_cross_column_as[i] = []	// in case of TypeError: Cannot set property '0' of undefined
			table_cross_fkey[i].forEach(function(y,l,arr2){
				table_cross_column_as[i][l] = []	
				table_cross_cols[i].forEach(function(w,j,array){
					if(table_cross_cols[i][j].fkey){
						table_cross_column_as[i][l][j] = []
						table_cross_cols[i][j].cols.forEach(function(x,k,array2){
							table_cross_column_as[i][l][j][k] = table_cross_name[i] + '__' +  table_cross_fkey[i][l]  + '__' +  table_cross_cols[i][j].table  + '__' + table_cross_cols[i][j].cols[k];		
						});
					}else{
						//console.log(table_cross_cols[i][j]);
						table_cross_column_as[i][l][j] = table_cross_name[i] + '__' +  table_cross_fkey[i][l] + '__' + table_cross_cols[i][j];
					}
				});
			});
		}else{
			table_cross_column_as[i] = []	// in case of TypeError: Cannot set property '0' of undefined
			table_cross_cols[i].forEach(function(w,j,array){
				if(table_cross_cols[i][j].fkey){
					table_cross_column_as[i][j] = []
					table_cross_cols[i][j].cols.forEach(function(x,k,array2){
						table_cross_column_as[i][j][k] = table_cross_cols[i][j].table + '__' + table_cross_cols[i][j].cols[k];
						//console.log(table_cross_column_as);
					});
				}else{
					//console.log(table_cross_cols[i][j]);
					table_cross_column_as[i][j] = table_cross_name[i] + '__' + table_cross_cols[i][j];
					//console.log(table_cross_column_as);
				}
			});
		}
	});
	console.log(__filename);
	console.log("check_table_cross:  this.table_cross_name arrays checked !!! ");
	//console.log(this.table_cross_column_as);
	//console.log(this.table_cross_column_as[0][0][1][0]);
	this.table_cross_checked = true;
	return true;
}
module.exports = check_table_cross;

