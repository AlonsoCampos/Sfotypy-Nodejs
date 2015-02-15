var express = require('express');
var router = express.Router();
var Artist = require('../lib/artist');
var _= require('lodash');
//var debug = require('debug')('my-application:artists');

/* GET listar Artstas page. */
router.get('/', function(req, res) {
  /*
  var artists = [
  	'pausini',
  	'arjona',
  	'shakira',
  ];*/
  //Se le indica la ruta donde se encuentra
  //res.render('artists/index',{artists:artists});
  Artist.find({}, function(err,artists){
  	if (err) {
  		return res.send(err);
  	}
  	res.render('artists/index',{artists:artists});
  });

});

router.get('/add',function(req,res){
	res.render('artists/add');
});



router.get('/:artist_id',function(req,res){
	Artist.findById(req.params.artist_id, function(err,artist){
		res.render('artists/detail',{artist:artist});
	});
});


router.post('/', function(req,res){
	//debug('creating new artist');
	var name = req.body.name;
	var slug = req.body.slug;
	var title = req.body.title;
	var year = req.body.year;
	var title = req.body.title;
	console.log(req.body);
	if(!_.isUndefined(name) || name !=='' || slug !==''){
		var artist = new Artist(
			{
				name:name,
				slug:slug,
				albums:[{
					title:title,
					year:year,
					image:title
				}],
			});

		artist.save(function(err,artist){
			if(err){
				return res.send(err);
			}
			res.send(artist.name + ' was saved');
		});	
	}else{
		res.send("Please specify artist name");
	}
});

module.exports = router;
