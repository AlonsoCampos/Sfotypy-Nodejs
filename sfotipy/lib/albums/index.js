/*
* Creamos una conexion a la base de datos importando
* el archivo conection
*/
var db = require('../conection');
/**
	Declaramos un Schema con la conexion
*/
var Schema = db.Schema;
// Creamos un nuevo Schema con sus propiedades
var albumsSchema = new Schema({
	titulo:String,
	genero:String,
	productor:String
});

// Almacenamos el modelo en una varible que a su vez
//va a se importada en routes/albums
var Albums = db.model('Albums', albumsSchema);

module.exports = Albums;