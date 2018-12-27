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
function housetype(){
	console.log(__filename);
	var oHousetype = new Object;
	oHousetype.table_cross_checked = false;
	
	oHousetype.table_name = 'housetype';
	oHousetype.table_cols = ['typeId','name','status','operId','operTime'];

	oHousetype.table_cross_fkey = [];	
	oHousetype.table_cross_name = [];	
	oHousetype.table_cross_cols = [];	
	oHousetype.table_cross_column_as = []; 	
	
	oHousetype.check_table_cross = check_table_cross;

    if(!oHousetype.table_cross_checked){
		oHousetype.check_table_cross();
    } 
	return oHousetype;
}

module.exports = housetype;

