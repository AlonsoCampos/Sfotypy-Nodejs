var db = require('../conection');
var Schema = db.Schema;

var artistSchema = new Schema({
	name:String,
	slug:String,
	albums:[{
		title:String,
		year:Number,
		image:String,
	}],
	shows:[{
		city:String
	}]
});

var Artist = db.model('Artist', artistSchema);

module.exports = Artist;