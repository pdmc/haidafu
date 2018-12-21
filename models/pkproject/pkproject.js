/*
 *	PK4YO Co. Ltd.
 *  Author: Zhang Hui <spacetiller@163.com>
 *  Time: 2018-12-19
 *  All Copyrights Reserved.
 */
//var express = require('express');

function check_table_cross(){
	console.log('--- enter check_table_cross ---');
	var table_cross_fkey = this.table_cross_fkey;
	var table_cross_name = this.table_cross_name;
	var table_cross_cols = this.table_cross_cols;
	var table_cross_column_as = this.table_cross_column_as;

	if(table_cross_fkey.length != table_cross_name.length || table_cross_name.length != table_cross_cols.length){
		console.log("check_table_cross:  cross table related array not corresponding, check it !!!"); 
		return false;
	}
	table_cross_name.forEach(function(v,i,arr){
		//console.log(table_cross_name[i]);
		if(table_cross_cols[i].length < 2){
			console.log("check_table_cross:  table_cross_cols contains length < 2, must be id + value 2 columns at least !!!"); 
			return false;
		}
		if(table_cross_fkey[i].length > 1){	// multiple foreign keys
			table_cross_column_as[i] = []	// in case of TypeError: Cannot set property '0' of undefined
			table_cross_fkey[i].forEach(function(y,l,arr2){
				table_cross_column_as[i][l] = []	
				table_cross_cols[i].forEach(function(w,j,array){
					if(table_cross_cols[i][j].fkey){
						table_cross_column_as[i][l][j] = []
						table_cross_cols[i][j].cols.forEach(function(x,k,array2){
							table_cross_column_as[i][l][j][k] = table_cross_name[i] + '__' +  table_cross_fkey[i][l]  + '__' +  table_cross_cols[i][j].table  + '__' + table_cross_cols[i][j].cols[k];		
						});
					}else{
						//console.log(table_cross_cols[i][j]);
						table_cross_column_as[i][l][j] = table_cross_name[i] + '__' +  table_cross_fkey[i][l] + '__' + table_cross_cols[i][j];
					}
				});
			});
		}else{
			table_cross_column_as[i] = []	// in case of TypeError: Cannot set property '0' of undefined
			table_cross_cols[i].forEach(function(w,j,array){
				if(table_cross_cols[i][j].fkey){
					table_cross_column_as[i][j] = []
					table_cross_cols[i][j].cols.forEach(function(x,k,array2){
						table_cross_column_as[i][j][k] = table_cross_cols[i][j].table + '__' + table_cross_cols[i][j].cols[k];
					});
				}else{
					//console.log(table_cross_cols[i][j]);
					table_cross_column_as[i][j] = table_cross_name[i] + '__' + table_cross_cols[i][j];
				}
			});
		}
	});
	console.log(__filename);
	console.log("check_table_cross:  this.table_cross_name arrays checked !!! ");
	console.log(this.table_cross_column_as);
	console.log(this.table_cross_column_as[0][0][1][0]);
	this.table_cross_checked = true;
	return true;
}
//check_table_cross();
//function showColor() {
//  console.log(this.color);
//}

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
	var oProject = new Object;
	oProject.table_cross_checked = false;
	
	this.table_name = 'this pkproject';
	oProject.table_name = 'pkproject';
	oProject.table_cols = ['pId','pName','status','minSquare','maxSquare','minPrice','maxPrice','countryId','provinceId','cityId','districtId','fullAddr','prightId','handoverYear','handoverMonth','handoverDay','canLoan','totalSquare','totalAmount','predictYearRent','localPricePic','picture1','picture2','picture3','thumbnail','description','selected'];
	oProject.condition_range = [['minSquare','maxSquare'],['minPrice','maxPrice']];	// all range condition appear in pairs !!!

	// 以下4个变量的长度必须一致！！！
	oProject.table_cross_fkey = [['countryId','provinceId','cityId'],['pId'],['prightId']];	
	// 每个查询外边，对应上面的外键组 以及 下面的查询列
	oProject.table_cross_name = ['area','houselayout','prighttype'];	
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
							['prId','name']
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


