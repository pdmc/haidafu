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
function houselayout(){
	console.log(__filename);
	var oHouselayout = new Object;
	oHouselayout.table_cross_checked = false;
	
	oHouselayout.table_name = 'houselayout';
	oHouselayout.table_cols = ['hlId','pId','livingroomNum','bedroomNum','bathroomNum','typeId','minPrice','maxPrice','fitmentId','withPool','withTerrace','picture1','picture2','picture3','picture4'];

	oHouselayout.table_cross_fkey = ['typeId','fitmentId'];	
	oHouselayout.table_cross_name = ['housetype','fitmenttype'];	
	oHouselayout.table_cross_cols = [
									['typeId','name','status'],
									['ftId','name','status']
	];	
	oHouselayout.table_cross_column_as = []; 	
	
	oHouselayout.check_table_cross = check_table_cross;

    if(!oHouselayout.table_cross_checked){
		oHouselayout.check_table_cross();
    } 
	return oHouselayout;
}

module.exports = houselayout;

