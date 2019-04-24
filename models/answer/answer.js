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
function answer(){
	console.log(__filename);
	var oAnswer = new Object;
	oAnswer.table_cross_checked = false;
	
	oAnswer.table_name = 'answer';
	oAnswer.table_cols = ['anId','userId','qId','text','createTime','state'];
	oAnswer.condition_range = [];

	oAnswer.table_cross_fkey = ['qId','userId'];	
	oAnswer.table_cross_name = ['question','pkuser'];	
	oAnswer.table_cross_cols = [['qId','title','content',
								{fkey:'userId', table: 'pkuser', cols: ['userId', 'nickName','avatarUrl','labels' ]},
								'createTime','ansNum'],
								['userId','nickName','avatarUrl','labels']
	];	
	oAnswer.table_cross_column_as = []; 	
	
	oAnswer.check_table_cross = check_table_cross;

    if(!oAnswer.table_cross_checked){
		oAnswer.check_table_cross();
    } 
	return oAnswer;
}

module.exports = answer;

