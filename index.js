var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
morgan = require('morgan'); //logger

var rp = require('request-promise');

var environment = process.argv[2] || process.env.NODE_ENV || 'dev'

if (environment != 'release' && environment != 'dev') {
  environment = 'dev';
}

var  file ="";

//CORS middleware
var selectfile = function(url) {
 	

 	if(url =="metro"){
		console.log("metro");
		return file = require('./swagger-metro.json');
	}else
	if(url == "swagger"){
		console.log("swagger");
		return file = require('./swagger-general.json');
	}
  
}


//CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  //res.header('Origin, X-Requested-With, Content-Type, Accept');

  next();
}



//Config Express
app.use(allowCrossDomain);
app.use(morgan('combined'));
//Handles post requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Handles put requests




app.get('/:id', function(request, response) {
  	
	file = selectfile(request.params.id)
  	response.send(file);


  	/*
	var options = {
	    uri: req.params.id,
	    json: true // Automatically parses the JSON string in the response
	};
 
	rp(options)
    .then(function (repos) {
        response.send(repos);
    })
    .catch(function (err) {
    });
   */



})



app.listen(8000);
console.log('Express server started on port 8000', 8000);