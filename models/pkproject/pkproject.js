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
function pkproject(){
	console.log(__filename);
	var oProject = new Object;
	oProject.table_cross_checked = false;
	
	this.table_name = 'this pkproject';
	oProject.table_name = 'pkproject';
	oProject.table_cols = ['pId','pName','status','minSquare','maxSquare','minPrice','maxPrice','countryId','provinceId','cityId','districtId','fullAddr','prightId','handoverYear','handoverMonth','handoverDay','canLoan','totalSquare','totalAmount','predictYearRent','localPricePic','picture1','picture2','picture3','thumbnail','description','selected'];
	oProject.condition_range = [['minSquare','maxSquare'],['minPrice','maxPrice']];	// all range condition appear in pairs !!!

	// 以下4个变量的长度必须一致！！！
	oProject.table_cross_fkey = [['countryId','provinceId','cityId'],['pId'],['prightId'],['spId']];	
	// 每个查询外边，对应上面的外键组 以及 下面的查询列
	oProject.table_cross_name = ['area','houselayout','prighttype','pkprovider'];	
	// 查询列必须以对应外键的ID作为第一个，后面是查询的值列，不限个数
	// 2018.12.17 加入二级关联，在关联表中如果还有需要翻译的关联字段，则将这个字段翻译成对象，：{fkey: typeId, table: 'type', cols: [ 'id', 'name' ]}
							 //{fkey:'parentId', table: 'area', cols: [ 'addrId', 'name' ]},  国家的parentId为空
	oProject.table_cross_cols = [
							['addrId',
							 'name'],
							['pId','livingroomNum','bedroomNum','bathroomNum',
							  {fkey:'typeId', table: 'housetype', cols: [ 'typeId', 'name' ]},	// 可能的错误：关联表需要额外where条件
							  {fkey:'fitmentId', table: 'fitmenttype', cols: [ 'ftId', 'name' ]},	// 可能的错误：关联表需要额外where条件
							  'hlSquare','picture1'],
							['prId','name'],
							['spId','spName','description','imgurl']
	];	
	
	oProject.table_cross_column_as = []; 	//'table_cross_value_column'; // 返回值列一一对应上面的查询列，在运行后填充，为：表名+双下划线+列名，如 area__name
	
	oProject.check_table_cross = check_table_cross;
	//if (typeof pkproject._initialized == "undefined") {
	//    pkproject.prototype.check_table_cross = check_table_cross;
	//    pkproject._initialized = true;
	//}
	//oProject.color = 'red';
	//oProject.showColor = showColor;

    if(!oProject.table_cross_checked){
		oProject.check_table_cross();
		//pkproject.prototype.check_table_cross();
    } 
	return oProject;
}

module.exports = pkproject;

