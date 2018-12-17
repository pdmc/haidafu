var express = require('express');
var router = express.Router();
//var app = express();

var conn = require('../../config/database');

/* GET types listing. */
router.get('/', function(req, res, next) {
	//res.send('types');
	conn.connect();
	
 	var rets = '';
	var sql = 'SELECT * FROM housetype';
	//查
	conn.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        console.log('--------------------------SELECT----------------------------');
        console.log(result);
		rets = result;
		res.send(rets);
        console.log('------------------------------------------------------------\n\n');  
		conn.end();
	});
	console.log("first here"); 
});

router.get('/aa', function(req, res, next) {
	res.send('types aa');
});
//app.use('/types/',router);

module.exports = router;
