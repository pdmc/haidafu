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
function verify(){
	console.log(__filename);
	var oVerify = new Object;
	oVerify.table_cross_checked = false;
	
	oVerify.table_name = 'verify';
	oVerify.table_cols = ['veriId','code','phone','timestamp'];
	oVerify.condition_range = [];

	oVerify.table_cross_fkey = [];	
	oVerify.table_cross_name = [];	
	oVerify.table_cross_cols = [];	
	oVerify.table_cross_column_as = []; 	
	
	oVerify.check_table_cross = check_table_cross;

    if(!oVerify.table_cross_checked){
		oVerify.check_table_cross();
    } 
	return oVerify;
}

module.exports = verify;

