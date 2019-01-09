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
function pkprovider(){
	console.log(__filename);
	var oPkprovider = new Object;
	oPkprovider.table_cross_checked = false;
	
	oPkprovider.table_name = 'pkprovider';
	oPkprovider.table_cols = ['spId','spName','description','imgurl'];
	oPkprovider.condition_range = [];

	oPkprovider.table_cross_fkey = [];	
	oPkprovider.table_cross_name = [];	
	oPkprovider.table_cross_cols = [];	
	oPkprovider.table_cross_column_as = []; 	
	
	oPkprovider.check_table_cross = check_table_cross;

    if(!oPkprovider.table_cross_checked){
		oPkprovider.check_table_cross();
    } 
	return oPkprovider;
}

module.exports = pkprovider;

