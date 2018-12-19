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
 
module.exports = dbconfig;
