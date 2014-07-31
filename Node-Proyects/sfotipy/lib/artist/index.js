var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('alonso:123@kahana.mongohq.com:10099/backendpro')

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

var Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;