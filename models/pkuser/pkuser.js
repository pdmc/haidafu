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
function pkuser(){
	console.log(__filename);
	var oPkuser = new Object;
	oPkuser.table_cross_checked = false;
	
	oPkuser.table_name = 'pkuser';
	oPkuser.table_cols = ['userId','nickName','trueName','phone','gender','language','city','province','country','avatarUrl','js_code','openid','token','session_key','sessionid','channel'];
	oPkuser.condition_range = [];

	oPkuser.table_cross_fkey = [];	
	oPkuser.table_cross_name = [];	
	oPkuser.table_cross_cols = [];	
	oPkuser.table_cross_column_as = []; 	
	
	oPkuser.check_table_cross = check_table_cross;

    if(!oPkuser.table_cross_checked){
		oPkuser.check_table_cross();
    } 
	return oPkuser;
}

module.exports = pkuser;

