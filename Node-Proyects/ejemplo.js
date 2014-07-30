/*
	Ejemplo Basico Conect


var connect = require('connect')
var app 	= connect()
app.listen(3000)
/*

/*
	Usando Middleware
	req  - Request
	res  - Envia Informacion de Respuesta
	next - Lo siguiente


function logger(req,res,next){
	console.log("#backendpro %s %s", req.method, req.url)
	next();
}

var connect = require('connect');
var app 	= connect();
app
.use(logger)
.listen(3000);

*/
/*
	Hola Mundo Node


function hello(req,res,next){
	res.setHeader("Content-Type","text/plain");
	res.end("Hello World #backendpro");
}

var connect = require('connect');
var app 	= connect();
app
.use(hello)
.listen(3000);

*/

/*
	Multiples Middlewares
	El orden de ejecucion de los Middlewares importa
	debido a que si no existe una funcion next() en uno
	se termana en ese instante.
	
	app
	.use(hello)
	.use(logger)
	.listen(3000);

	Si se ejecuta solo se ejecuta la funcion hello
	y no pasa al siguiente.

	app
	.use(logger)
	.use(hello)
	.listen(3000);

	En cambio si se coloca esto funciona

	Hay una regla de que no se puede fijar 2 veces los
	encabezados .setHeader



function hello(req,res,next){
	res.setHeader("Content-Type","text/plain");
	res.end("Hello World #backendpro");
}

function logger(req,res,next){
	console.log("#backendpro %s %s", req.method, req.url)
	next();
}

var connect = require('connect');
var app 	= connect();

app
	.use(logger)
	.use(hello)
	.listen(3000);
*/

/**
	Montaje de Middleware
*/

function restrict(req, res,next){
	var authorization = req.headers.authorization;
	if(!authorization){
		return next(new Error("Unauthorized"));
	}

	var parts = authorization.split(' ');
	var scheme = parts[0];
	var auth = new Buffer(parts[1],'base64').toString().split(':');
	var user = auth[0];
	var pass = auth[1];

	authWithDB(user,pass,function(err){
		if(err){
			return next(err);
		}
		next();
	});
}

/**
	Esta funcion responde a 2 rutas
	http://localhost:3000/admin
	http://localhost:3000/admin/users
*/
function admin(req,res,next){
	switch(req.url){
		case '/':
			res.end('try /users');
			break;
		case '/users':
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringfy(['freddy','cvander','yoshi']));
			break;
	}
}

function authWithDB(user,pass,cb){
	if(pass!='backendpro'){
		return cb('Credenciales incorrectas');
	}
	cb();
}

function hello(req,res,next){
	res.setHeader("Content-Type","text/plain");
	res.end("Hello World #backendpro");
}

function logger(req,res,next){
	console.log("#backendpro %s %s", req.method, req.url)
	next();
}

/*
	Para capturar errores
*/

function errorHandler(){
	var env = process.env.NODE_ENV || 'development';
	return function(err,req,res,next)
	{
		res.statusCode = 500;
		switch(env){
			case 'development':
				res.setHeader('Content-Type','application/json');
				res.end(JSON.stringfy(err));
				break;
			default:
				res.end('Server Error');
		}
	};
}

var connect = require('connect');
var app 	= connect();

app
	.use('/admin',restrict)
	.use('/admin',admin)
	.use(hello)
	.user(errorHandler)
	.listen(3000);


