
var db = require('../conection');

var Schema = db.Schema;

var singsSchema = new Schema({
	title:String,
	artist:String
});

var Sings = db.model('Sings', singsSchema);

module.exports = Sings;
