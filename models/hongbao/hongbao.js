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
function hongbao(){
	console.log(__filename);
	var oHongbao = new Object;
	oHongbao.table_cross_checked = false;
	
	oHongbao.table_name = 'hongbao';
	oHongbao.table_cols = ['hbId','userId','pId','amount','state','createTime','useTime','source'];
	oHongbao.condition_range = [];

	oHongbao.table_cross_fkey = ['pId'];	
	oHongbao.table_cross_name = ['pkproject'];	
	oHongbao.table_cross_cols = [['pId','pName','minSquare','maxSquare','minPrice','maxPrice',
								{fkey:'countryId', table: 'area', cols: ['addrId', 'name' ]},
								{fkey:'cityId', table: 'area', cols: ['addrId', 'name' ]},
								'thumbnail']];	
	oHongbao.table_cross_column_as = []; 	
	
	oHongbao.check_table_cross = check_table_cross;

    if(!oHongbao.table_cross_checked){
		oHongbao.check_table_cross();
    } 
	return oHongbao;
}

module.exports = hongbao;

