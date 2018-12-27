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
function reservation(){
	console.log(__filename);
	var oReservation = new Object;
	oReservation.table_cross_checked = false;
	
	oReservation.table_name = 'reservation';
	oReservation.table_cols = ['rId','userId','actId','status','applyTime'];

	oReservation.table_cross_fkey = ['actId'];	
	oReservation.table_cross_name = ['pkactivity'];	
	oReservation.table_cross_cols = [['actId','subject','address','startTime','endTime','imgurl']];	
	oReservation.table_cross_column_as = []; 	
	
	oReservation.check_table_cross = check_table_cross;

    if(!oReservation.table_cross_checked){
		oReservation.check_table_cross();
    } 
	return oReservation;
}

module.exports = reservation;
