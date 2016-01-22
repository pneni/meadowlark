/* global process */
var express = require('express');
var fortune = require('./lib/fortune.js');

var app = express();
// ./.  signals to Node that it should not look for the module in the node_modules directory; 
//if we omitted that prefix, this would fail.

// var fortunes = [
// "Conquer your fears or they will conquer you.", "Rivers need springs.",
// "Do not fear what you don't know.",
// "You will have a pleasant surprise.",
// "Whenever possible, keep it simple.",
// ];

// set up handlebars view engine
var handlebars = require('express-handlebars') .create({ 
    defaultLayout:'main',
    helpers:{
        section: function(name,options){
            if(!this.section) this.sections ={};
            this._section[name] = options.fn(this);
            return null;
            }
        } 
    });
    
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));

//  set 'showTest' context property if the query string contains test=1
app.use(function(req,res,next){
	res.locals.showTests = app.get('env')!=='production'&& 
    req.query.test==='1';
	next();
});

// Mocked Weather data
 
//  function getWeatherData(){
//      return {
//          locations: [
//              {
//                name: 'Portland',
//                forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
//                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
//                weather: 'Overcast',
//                temp: '54.1 F (12.3 C)',
//               },   
//               {
//                name: 'Bend',
//                forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
//                iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
//                weather: 'Partly Cloudy',
//                temp: '55.0 F (12.8 C)',
//               }, 
//               {
//                name: 'Manzanita',
//                forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
//                iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
//                weather: 'Light Rain',
//                temp: '55.0 F (12.8 C)',
//               }     
//          ],
//      };
//  }
    
// app.use(function(req, res, next){
//     if(!res.locals.partials) res.locals.partials = {};
//      res.locals.partials.weather = getWeatherData();
//       next();
// });

// weather widgets go

function getWeatherData(){ return {
            locations: [
                {
                    name: 'Portland',
                    forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
                    iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                    weather: 'Overcast',
                    temp: '54.1 F (12.3 C)',
                },
                {
                    name: 'Bend',
                    forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
                    iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
                    weather: 'Partly Cloudy',
                    temp: '55.0 F (12.8 C)',
                },
                {
                    name: 'Manzanita',
                    forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
                    iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
                    weather: 'Light Rain',
                    temp: '55.0 F (12.8 C)',
                }
           ],
    };   
}

app.use(function(req, res, next){
        if(!res.locals.partials) res.locals.partials = {}; 
        res.locals.partials.weather = getWeatherData(); 
        next();
});

// Routes go here.....

app.get('/', function(req, res){
    res.render('home');
	//res.render('home', getWeatherData.locations);
	// res.type('text/plain');
	// res.send ('MEADOW LARK TRAVEL');
});

app.get('/about', function(req,res) {
	//var randomFortune =  fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', { 
		fortune: fortune.getFortune(),
		pageTestScript: '/qa/tests-about.js' 
	} );
	// res.type('text/plain');
	// res.send('ABOUT MEADOW LARK TRAVEL');
});

app.get('/tours/hood-river', function(req,res){
	 res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req,res){
	res.render('tours/request-group-rate');
});

app.get('/tours/oregon-coast',function(req,res){
	res.render('tours/oregon-coast');
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
	console.log('Express started on http://localhost:' + 
    app.get('port') + '; press ctrl+c to terminate');
});

