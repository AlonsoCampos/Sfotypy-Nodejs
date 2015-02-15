var express = require('express');
var router = express.Router();
//Aqui importamos nuestro Schema Albums
var Albums = require('../lib/albums');


/* 
	GET lista los albums disponibles.
	Aqui se toman todos los albums registrados
	y se envian a la vista mediante un objeto 
	llamado albums
 */

router.get('/', function(req, res) {
  Albums.find({}, function(err,albums){
  	if (err) {
  		return res.send(err);
  	}
  	res.render('albums/index',{albums:albums});
  });

});
// Aqui se declara la ruta para llamar una vista de agregar
router.get('/add',function(req,res){
	res.render('albums/add');
});


router.post('/', function(req,res){
	//Se crea una instancia del modelo
	var album 		= new Albums();
	album.titulo 	= req.body.titulo;
	album.genero 	= req.body.genero;
	album.productor = req.body.productor;
	
	album.save(function(err) {
		if (err){
			res.send(err);
		}
		res.json({ message: 'Album created!' });
	});

});


router.get('/:album_id',function(req,res){
	Albums.findById(req.params.album_id, function(err,album){
		res.render('albums/detail',{album:album});
	});
});


router.get('/edit/:album_id',function(req,res){
	Albums.findById(req.params.album_id, function(err,album){
		res.render('albums/edit',{album:album});
		console.log(album);
	});

});



router.put('/albums/edit/:album_id', function(req,res){
	Albums.findById(req.params.bear_id, function(err, album) {
		if (err){
			res.send(err);
		}
		album.titulo 	= req.body.titulo;
		album.genero 	= req.body.genero;
		album.productor = req.body.productor;
		
			album.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Album updated!' });
			});

	});
});


router.delete('/albums/:album_id', function(req,res){
	Albums.remove({
			_id: req.params.album_id
		}, function(err, album) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
});

module.exports = router;