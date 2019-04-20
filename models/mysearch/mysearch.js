/*
 *	PK4YO Co. Ltd.
 *  Author: Zhang Hui <spacetiller@163.com>
 *  Time: 2018-12-19
 *  All Copyrights Reserved.
 */
var express = require('express');
var check_table_cross = require('../util/util');

/**
 * table_cross_checked
 * table_name
 * table_cols
 * table_cross_fkey
 * table_cross_name
 * table_cross_cols
 * table_cross_column_as
 * check_table_cross()
 *
 */
function mysearch(){
	console.log(__filename);
	var oMysearch = new Object;
	oMysearch.table_cross_checked = false;
	
	oMysearch.table_name = 'mysearch';
	oMysearch.table_cols = ['schId','userId','content','lastTime'];
	oMysearch.condition_range = [];

	oMysearch.table_cross_fkey = ['userId'];	
	oMysearch.table_cross_name = ['pkuser'];	
	oMysearch.table_cross_cols = [
								['userId','nickName','avatarUrl']
	];	
	oMysearch.table_cross_column_as = []; 	
	
	oMysearch.check_table_cross = check_table_cross;

    if(!oMysearch.table_cross_checked){
		oMysearch.check_table_cross();
    } 
	return oMysearch;
}

module.exports = mysearch;

