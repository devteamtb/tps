const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mysql = require('mysql'),
    config = require('./DB');

   const productRoute = require('./routes/product.route');
   const userRoute = require('./routes/user.route');
   mysql.Promise = global.Promise;
	let connection = mysql.createConnection({
		host: config.host,
		user: config.user,
		password: config.password,
		database: config.database,
		port: config.portno
	});
    connection.connect(function(err) {
	  if (err) {
		return console.error('Can not connect to the database: ' + err.message);
	  }
	 console.log('Database is connected');
	});
	
	
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/products', productRoute);
	app.use('/users', userRoute);
    const port = process.env.PORT || 4000;

    const server = app.listen(port, function(){
     console.log('Listening on port ' + port);
    });
	
	