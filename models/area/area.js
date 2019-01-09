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
function area(){
	console.log(__filename);
	var oArea = new Object;
	oArea.table_cross_checked = false;
	
	this.table_name = 'this pkproject';
	oArea.table_name = 'area';
	oArea.table_cols = ['addrId','name','parentId','level'];
	oArea.condition_range = [];

	oArea.table_cross_fkey = [];	
	oArea.table_cross_name = [];	
	oArea.table_cross_cols = [];	
	oArea.table_cross_column_as = []; 	
	
	oArea.check_table_cross = check_table_cross;

    if(!oArea.table_cross_checked){
		oArea.check_table_cross();
    } 
	return oArea;
}

module.exports = area;

