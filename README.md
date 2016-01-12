Sample application to learn Node, express and Mongo DB along with testing framework Mocha.. Chai

Express Static information: 
If you run the express app from another directory, it’s safer to use the absolute path of the directory that you want to serve:
	app.use('/static', express.static(__dirname + '/public'));