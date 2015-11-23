require('babel/register');

// connect to database.
const dbSchema = require('../database/dbSchema.js');
const chalk     = require('chalk');
const devServer = require('../build/webpack-dev-server');
const config    = require('../config');
const host = config.get('webpack_host');
const port = config.get('webpack_port');
const parser = require('body-parser');
const session = require('express-session');
const utils = require('./lib/utils');

devServer.app.use(parser.json());
devServer.app.use(session({
	secret: "Backend if fun because I don't have to deal with react"
	}));
	
devServer.app.post('/login',function(req,res){
	console.log("this is the password", req.body.password)
	dbSchema.User.findOne({
		where: 
			{
				userName: req.body.username,
				password: req.body.password
			}
		})
 	.then(function(results){
 		if(results){
 			utils.createSession(req,res,results);
 		}else{
 			res.redirect('/login')
 		}
	})
})

/*
'buildATestUser' below is a test function which:
 * builds the Sequelize models
 * builds/clears the database tables
 * and builds our first and only user.
 * It also imports and uses Sequlize and the DB connection.
 ! It will not work without a localPWD.js in the root of your repo.

 Try calling this function from anywhere!
 It is currently being called only in this file..
*/

//dbSchema.buildATestUser();


devServer.listen(port, host, function () {
  console.log(chalk.green(
    `webpack-dev-server is now running at ${host}:${port}.`
  ));
});
