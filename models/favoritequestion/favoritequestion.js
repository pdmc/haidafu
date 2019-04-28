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
function favoriteQuestion(){
	console.log(__filename);
	var oFavoriteQuestion = new Object;
	oFavoriteQuestion.table_cross_checked = false;
	
	oFavoriteQuestion.table_name = 'favoritequestion';
	oFavoriteQuestion.table_cols = ['fId','userId','pId','articleId','createTime'];
	oFavoriteQuestion.condition_range = [];

	oFavoriteQuestion.table_cross_fkey = ['articleId'];	
	oFavoriteQuestion.table_cross_name = ['question'];	
	oFavoriteQuestion.table_cross_cols = [
								['qId','title','content','userId','labels','createTime','ansNum','state']
	];	
	oFavoriteQuestion.table_cross_column_as = []; 	
	
	oFavoriteQuestion.check_table_cross = check_table_cross;

    if(!oFavoriteQuestion.table_cross_checked){
		oFavoriteQuestion.check_table_cross();
    } 
	return oFavoriteQuestion;
}

module.exports = favoriteQuestion;

