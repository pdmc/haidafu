/*
 *	PK4YO Co. Ltd.
 *  Author: Zhang Hui <spacetiller@163.com>
 *  Time: 2018-12-19
 *  All Copyrights Reserved.
 */
var express = require('express');
var dbconfig = {     
  connectionLimit : 10,
  host     : '172.16.101.27',       
  user     : 'pk4yo',              
  password : 'zzeP6GAkZ5qt',       
  port     : '3306',                   
  database : 'hdf_dev' 
}; 

var whitelist = ['172.16.102.42','103.37.160.177','117.136.0.232','117.136.0.226','117.136.38.151','223.104.3.14','106.38.150.12'];
var common = {
	baseimgurl : 'http://image.pk4yo.com/haidafu/'
};

var config = { dbconfig: dbconfig, whitelist: whitelist, config: common };

module.exports = config;
