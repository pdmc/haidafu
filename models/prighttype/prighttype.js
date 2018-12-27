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
function prighttype(){
	console.log(__filename);
	var oPrighttype = new Object;
	oPrighttype.table_cross_checked = false;
	
	oPrighttype.table_name = 'prighttype';
	oPrighttype.table_cols = ['prId','name','status','operId','operTime'];

	oPrighttype.table_cross_fkey = [];	
	oPrighttype.table_cross_name = [];	
	oPrighttype.table_cross_cols = [];	
	oPrighttype.table_cross_column_as = []; 	
	
	oPrighttype.check_table_cross = check_table_cross;

    if(!oPrighttype.table_cross_checked){
		oPrighttype.check_table_cross();
    } 
	return oPrighttype;
}

module.exports = prighttype;

