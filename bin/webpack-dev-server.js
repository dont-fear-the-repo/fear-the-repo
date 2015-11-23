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
 
devServer.app.post('/authentication',utils.checkUser);


	
devServer.app.post('/login',function(req,res){
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



devServer.listen(port, host, function () {
  console.log(chalk.green(
    `webpack-dev-server is now running at ${host}:${port}.`
  ));
});
