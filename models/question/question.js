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
function question(){
	console.log(__filename);
	var oQuestion = new Object;
	oQuestion.table_cross_checked = false;
	
	oQuestion.table_name = 'question';
	oQuestion.table_cols = ['qId','title','content','userId','labels','createTime','ansNum'];
	oQuestion.condition_range = [];

	oQuestion.table_cross_fkey = ['userId'];	
	oQuestion.table_cross_name = ['pkuser'];	
	oQuestion.table_cross_cols = [
								['userId','nickName','avatarUrl','labels']
	];	
	oQuestion.table_cross_column_as = []; 	
	
	oQuestion.check_table_cross = check_table_cross;

    if(!oQuestion.table_cross_checked){
		oQuestion.check_table_cross();
    } 
	return oQuestion;
}

module.exports = question;

