var express = require('express');
var app = express();
var fortune = require('./lib/fortune.js');
// ./.  signals to Node that it should not look for the module in the node_modules directory; 
//if we omitted that prefix, this would fail.

// var fortunes = [
// "Conquer your fears or they will conquer you.", "Rivers need springs.",
// "Do not fear what you don't know.",
// "You will have a pleasant surprise.",
// "Whenever possible, keep it simple.",
// ];

// set up handlebars view engine
var handlebars = require('express-handlebars') .create({ defaultLayout:'main' });
    app.engine('handlebars', handlebars.engine);
    app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));

app.get('/', function(req, res){
	res.render('home');
	// res.type('text/plain');
	// res.send ('MEADOW LARK TRAVEL');
});

app.get('/about', function(req,res){
//var randomFortune =  fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about' ,{ fortune: fortune.getFortune() });
	// res.type('text/plain');
	// res.send('ABOUT MEADOW LARK TRAVEL');
});


//Custome 404 Page

app.use(function (req,res){
	res.status (404);
	res.render('404');
	// res.type('text/plain');
	// res.send ('404 - NOT FOUND');
});

app.use(function(err,req,res,next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
	// res.type('text/plain');
	// res.send('500 - server error');
});
app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:'+app.get('port')+'; press ctrl+c to terminate');
});
