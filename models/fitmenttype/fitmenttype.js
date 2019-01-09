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
function fitmenttype(){
	console.log(__filename);
	var oFitmenttype = new Object;
	oFitmenttype.table_cross_checked = false;
	
	oFitmenttype.table_name = 'fitmenttype';
	oFitmenttype.table_cols = ['ftId','name','status','operId','operTime'];
	oFitmenttype.condition_range = [];

	oFitmenttype.table_cross_fkey = [];	
	oFitmenttype.table_cross_name = [];	
	oFitmenttype.table_cross_cols = [];	
	oFitmenttype.table_cross_column_as = []; 	
	
	oFitmenttype.check_table_cross = check_table_cross;

    if(!oFitmenttype.table_cross_checked){
		oFitmenttype.check_table_cross();
    } 
	return oFitmenttype;
}

module.exports = fitmenttype;

