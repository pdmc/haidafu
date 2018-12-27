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
function pkactivity(){
	console.log(__filename);
	var oActivity = new Object;
	oActivity.table_cross_checked = false;
	
	oActivity.table_name = 'pkactivity';
	oActivity.table_cols = ['actId','subject','address','startTime','endTime','imgurl'];

	oActivity.table_cross_fkey = [];	
	oActivity.table_cross_name = [];	
	oActivity.table_cross_cols = [];	
	oActivity.table_cross_column_as = []; 	
	
	oActivity.check_table_cross = check_table_cross;

    if(!oActivity.table_cross_checked){
		oActivity.check_table_cross();
    } 
	return oActivity;
}

module.exports = pkactivity;

