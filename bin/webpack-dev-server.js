require('babel/register');

// connect to database.
const dbSchema = require('../database/dbSchema.js');
const chalk     = require('chalk');
const devServer = require('../build/webpack-dev-server');
const config    = require('../config');
const host = config.get('webpack_host');
const port = config.get('webpack_port');
const parser = require('body-parser');

devServer.use(parser.json());

devServer.post('/login',function(req,res){
	console.log(req.body);
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

dbSchema.buildATestUser();


devServer.listen(port, host, function () {
  console.log(chalk.green(
    `webpack-dev-server is now running at ${host}:${port}.`
  ));
});
