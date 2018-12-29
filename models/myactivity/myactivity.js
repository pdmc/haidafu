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
function myactivity(){
	console.log(__filename);
	var oMyactivity = new Object;
	oMyactivity.table_cross_checked = false;
	
	oMyactivity.table_name = 'myactivity';
	oMyactivity.table_cols = ['maId','userId','actId','status','applyTime'];

	oMyactivity.table_cross_fkey = ['actId'];	
	oMyactivity.table_cross_name = ['pkactivity'];	
	oMyactivity.table_cross_cols = [['actId','subject','address','startTime','endTime','imgurl']];	
	oMyactivity.table_cross_column_as = []; 	
	
	oMyactivity.check_table_cross = check_table_cross;

    if(!oMyactivity.table_cross_checked){
		oMyactivity.check_table_cross();
    } 
	return oMyactivity;
}

module.exports = myactivity;

