var express = require('express');
var router = express.Router();
var Sings = require('../lib/sings');
var _= require('lodash');

/* GET listar Sings page. */

router.get('/', function(req, res) {
  Sings.find({}, function(err,sings){
  	if (err) {
  		return res.send(err);
  	}
  	res.render('sings/index',{sings:sings});
  });

});

router.get('/add',function(req,res){
	res.render('sings/add');
});



router.get('/:sing_id',function(req,res){
	Sings.findById(req.params.sing_id, function(err,sing){
		res.render('sings/detail',{sing:sing});
	});
});


router.post('/', function(req,res){
	//debug('creating new artist');
	var title = req.body.title;
	var artist = req.body.artist;

	console.log(req.body);
	if(title !=='' || artist !==''){
		var sing = new Sings(
			{
				title:title,
				artist:artist
			});

		sing.save(function(err,sing){
			if(err){
				return res.send(err);
			}
			res.send(sing.title + ' was saved');
		});	
	}else{
		res.send("Please specify sing name");
	}
});

module.exports = router;
