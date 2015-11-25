require('babel/register');

// connect to database.
const dbSchema = require('../database/dbSchema.js');
const chalk = require('chalk');
const devServer = require('../build/webpack-dev-server');
const config = require('../config');
const host = config.get('webpack_host');
const port = config.get('webpack_port');
const parser = require('body-parser');
const session = require('express-session');
const utils = require('./lib/utils');




devServer.listen(port, host, function() {
  console.log(chalk.green(
    `webpack-dev-server is now running at ${host}:${port}.`
  ));
});


////////////////////////////////////////////////////////////////////////
// TODO: All of this Auth and API will need to be refactored someday  //
// to an external file so that a deployment server can use them       //
////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////
//                                                             //
//  Authentication for the server, create sessions API         //
//                                                             //
/////////////////////////////////////////////////////////////////


devServer.app.use(parser.json());

devServer.app.use(session({
  secret: "Backend is fun because I don't have to deal with react"
}));

devServer.app.post('/authentication', utils.checkUser);

devServer.app.post('/login', function(req, res) {
  dbSchema.User.findOne({
      where: {
        userName: req.body.username,
        password: req.body.password
      }
    })
    .then(function(results) {
      if (results) {
        utils.createSession(req, res, results);
      } else {
        res.redirect('/login')
      }
    })
})




/////////////////////////////////////////////////////////////////
//                                                             //
// Database methods API:here for now, should be refactored     //
//                                                             //
/////////////////////////////////////////////////////////////////


/*
To test the API, try this:

"Send a POST request with JSON payload {id:1} to localhost/api/user and print me the details"
    curl -H "Content-Type: application/json" -X POST -d '{"id":"1"}' http://localhost:3000/api/findauser

To add a user to the database, three flavors:
   curl -H "Content-Type: application/json" -X POST -d '{"userName":"chrisrhoton","password":"chrisrhoton","email":"chrisrhoton","firstName":"chrisrhoton","lastName":"chrisrhoton","headline":"chrisrhoton","industry":"chrisrhoton","country":"chrisrhoton","city":"chrisrhoton","zipCode":"chrisrhoton","phoneNumber":"chrisrhoton","facebookURL":"chrisrhoton","linkedInURL":"chrisrhoton","homepageURL":"chrisrhoton","blogURL":"chrisrhoton","githubURL":"chrisrhoton","behanceURL":"chrisrhoton","web1Title":"chrisrhoton","web1URL":"chrisrhoton","web2Title":"chrisrhoton","web2URL":"chrisrhoton","pictureUrl":"chrisrhoton","positions":"chrisrhoton","summary":"chrisrhoton"}'  http://localhost:3000/api/userinfo
   curl -H "Content-Type: application/json" -X POST -d '{"userName":"seconduser","password":"seconduser","email":"seconduser","firstName":"seconduser","lastName":"seconduser","headline":"seconduser","industry":"seconduser","country":"seconduser","city":"chrisrhoton","zipCode":"chrisrhoton","phoneNumber":"chrisrhoton","facebookURL":"chrisrhoton","linkedInURL":"chrisrhoton","homepageURL":"chrisrhoton","blogURL":"chrisrhoton","githubURL":"chrisrhoton","behanceURL":"chrisrhoton","web1Title":"chrisrhoton","web1URL":"chrisrhoton","web2Title":"chrisrhoton","web2URL":"chrisrhoton","pictureUrl":"chrisrhoton","positions":"chrisrhoton","summary":"chrisrhoton"}'  http://localhost:3000/api/userinfo
   curl -H "Content-Type: application/json" -X POST -d '{"userName":"thirdUser","password":"thirdUser","email":"thirdUser","firstName":"thirdUser","lastName":"thirdUser","headline":"thirdUser","industry":"thirdUser","country":"thirdUser","city":"thirdUser","zipCode":"thirdUser","phoneNumber":"thirdUser","facebookURL":"thirdUser","linkedInURL":"thirdUser","homepageURL":"thirdUser","blogURL":"thirdUser","githubURL":"thirdUser","behanceURL":"thirdUser","web1Title":"thirdUser","web1URL":"thirdUser","web2Title":"thirdUser","web2URL":"thirdUser","pictureUrl":"thirdUser","positions":"thirdUser","summary":"thirdUser"}'  http://localhost:3000/api/userinfo

*/


devServer.app.post('/api/findauser', function(req, res) {
  dbSchema.User.findOne({
      where: {
        id: req.body.id
      }
    })
    .then(function(results) {
      res.send(results.dataValues);
    })
})


//Insert Query 1 : Insert User Info
devServer.app.post('/api/userinfo', function(req, res) {
  dbSchema.User.create({
    where: {
      userName: req.body.userName
    },
    defaults: {
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    headline: req.body.headline,
    industry: req.body.industry,
    country: req.body.country,
    city: req.body.city,
    zipCode: req.body.zipCode,
    phoneNumber: req.body.phoneNumber,
    facebookURL: req.body.facebookURL,
    linkedInURL: req.body.linkedInURL,
    homepageURL: req.body.homepageURL,
    blogURL: req.body.blogURL,
    githubURL: req.body.githubURL,
    behanceURL: req.body.behanceURL,
    web1Title: req.body.web1Title,
    web1URL: req.body.web1URL,
    web2Title: req.body.web2Title,
    web2URL: req.body.web2URL,
    pictureUrl: req.body.pictureUrl,
    positions: req.body.positions,
    summary: req.body.summary
  }
  }).then(function(userinfo) {
    res.send('successfully added ', userinfo);
  });
});



