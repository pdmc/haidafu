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
function favorite(){
	console.log(__filename);
	var oFavorite = new Object;
	oFavorite.table_cross_checked = false;
	
	oFavorite.table_name = 'favorite';
	oFavorite.table_cols = ['fId','userId','pId','articleId','createTime'];

	oFavorite.table_cross_fkey = [];	
	oFavorite.table_cross_name = [];	
	oFavorite.table_cross_cols = [];	
	oFavorite.table_cross_column_as = []; 	
	
	oFavorite.check_table_cross = check_table_cross;

    if(!oFavorite.table_cross_checked){
		oFavorite.check_table_cross();
    } 
	return oFavorite;
}

module.exports = favorite;

