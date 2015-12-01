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
	secret: "Backend if fun because I don't have to deal with react",
	cookie: {httpOnly: false}
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
 			res.send(404);
 		}
	})
});


/////////////////////////////////////////////////////////////////
//                                                             //
// Database methods API:here for now, should be refactored     //
//                                                             //
/////////////////////////////////////////////////////////////////


/*
To test the API, try this:
"Send me all users, please"
   curl -H "Content-Type: application/json" -X POST -d '{"id":"1"}' http://localhost:3000/api/allusers

"Take this POST request with JSON payload {id:1} to localhost/api/user and print me the details"
    curl -H "Content-Type: application/json" -X POST -d '{"id":"1"}' http://localhost:3000/api/findauser

"Add a new user to the database, three flavors:"
   curl -H "Content-Type: application/json" -X POST -d '{"userName":"chrisrhoton","password":"chrisrhoton","email":"chrisrhoton","firstName":"chrisrhoton","lastName":"chrisrhoton","headline":"chrisrhoton","industry":"chrisrhoton","country":"chrisrhoton","city":"chrisrhoton","zipCode":"chrisrhoton","phoneNumber":"chrisrhoton","facebookURL":"chrisrhoton","linkedInURL":"chrisrhoton","homepageURL":"chrisrhoton","blogURL":"chrisrhoton","githubURL":"chrisrhoton","behanceURL":"chrisrhoton","web1Title":"chrisrhoton","web1URL":"chrisrhoton","web2Title":"chrisrhoton","web2URL":"chrisrhoton","pictureUrl":"chrisrhoton","positions":"chrisrhoton","summary":"chrisrhoton"}'  http://localhost:3000/api/userinfo
   curl -H "Content-Type: application/json" -X POST -d '{"userName":"seconduser","password":"seconduser","email":"seconduser","firstName":"seconduser","lastName":"seconduser","headline":"seconduser","industry":"seconduser","country":"seconduser","city":"chrisrhoton","zipCode":"chrisrhoton","phoneNumber":"chrisrhoton","facebookURL":"chrisrhoton","linkedInURL":"chrisrhoton","homepageURL":"chrisrhoton","blogURL":"chrisrhoton","githubURL":"chrisrhoton","behanceURL":"chrisrhoton","web1Title":"chrisrhoton","web1URL":"chrisrhoton","web2Title":"chrisrhoton","web2URL":"chrisrhoton","pictureUrl":"chrisrhoton","positions":"chrisrhoton","summary":"chrisrhoton"}'  http://localhost:3000/api/userinfo
   curl -H "Content-Type: application/json" -X POST -d '{"userName":"thirdUser","password":"thirdUser","email":"thirdUser","firstName":"thirdUser","lastName":"thirdUser","headline":"thirdUser","industry":"thirdUser","country":"thirdUser","city":"thirdUser","zipCode":"thirdUser","phoneNumber":"thirdUser","facebookURL":"thirdUser","linkedInURL":"thirdUser","homepageURL":"thirdUser","blogURL":"thirdUser","githubURL":"thirdUser","behanceURL":"thirdUser","web1Title":"thirdUser","web1URL":"thirdUser","web2Title":"thirdUser","web2URL":"thirdUser","pictureUrl":"thirdUser","positions":"thirdUser","summary":"thirdUser"}'  http://localhost:3000/api/userinfo

"Add a new resume to the database:"
  curl -H "Content-Type: application/json" -X POST -d '{"userName":"chrisrhoton", "theme":"cia", "title":"software"}' http://localhost:3000/api/resume/create
  curl -H "Content-Type: application/json" -X POST -d '{"userName":"chrisrhoton", "theme":"teacher", "title":"instructor"}' http://localhost:3000/api/resume/create

"Add a new blocks to the database for a given userName, title:"
  curl -H "Content-Type: application/json" -X POST -d '{"userName":"chrisrhoton", "title":"instructor", "jobTitle":"Lead Instructor", "blockPosition":"1", "startDate":"11/29/2014", "endDate":"12/29/2999"}' http://localhost:3000/api/block/create
  curl -H "Content-Type: application/json" -X POST -d '{"userName":"chrisrhoton", "title":"instructor", "jobTitle":"Interim Managing Director", "blockPosition":"2", "startDate": "11/01/2014", "endDate":"12/01/2015"}' http://localhost:3000/api/block/create

"Add a new bullet to the database for a given userName, title, jobTitle:"
  curl -H "Content-Type: application/json" -X POST -d '{"userName":"chrisrhoton", "title":"instructor", "jobTitle":"Interim Managing Director", "bullet":"Created platform for students to get a 6 figure job", "bulletPosition": "1"}' http://localhost:3000/api/bullet/create
  curl -H "Content-Type: application/json" -X POST -d '{"userName":"chrisrhoton", "title":"instructor", "jobTitle":"Interim Managing Director", "bullet":"Reigned on the SF MKS empire", "bulletPosition":"2"}' http://localhost:3000/api/bullet/create

"Get all bullets from the database for a given userName:"
  curl -H "Content-Type: application/json" -X POST -d '{"userName":"chrisrhoton"}' http://localhost:3000/api/bullet/get

*/


// Find a user
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

// All users please
devServer.app.post('/api/allusers', function(req, res) {
  dbSchema.User.findAll()
    .then(function(results) {
      var userList = results.map(function(user){return "id: "+ user.id + " userName: " + user.userName});
      res.send(userList);
    })
})

// Create a User
devServer.app.post('/api/userinfo', function(req, res) {
  dbSchema.User.create({
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
  }).then(function(userinfo) {
    res.send('successfully added user: ', userinfo);
  });
});

////Create resume for given user
devServer.app.post('/api/resume/create', function(req, res){
  dbSchema.Resume.create({
    theme: req.body.theme,
    title: req.body.title
  }).then( function(resume) {
      dbSchema.User.findOne({
        where: {
          userName: req.body.userName
        }
      }).then(function(user){
        user.addResume(resume);
        res.send('successfully added resume: ', resume);
        });
    });
});

////Create block for given resume
devServer.app.post('/api/block/create', function(req, res){
  dbSchema.Block.create({
    jobTitle: req.body.jobTitle,
    blockPosition: req.body.blockPosition,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  }).then(function(block){
    dbSchema.User.findOne({
      where: {
        userName: req.body.userName
      }
    }).then(function(user){
      dbSchema.Resume.findOne({
        where: {
          title: req.body.title
        }
      }).then(function(resume){
        resume.addBlock(block);
        res.send('successfully added block: ', block);
      });
    });
  });
});

//Create bullets for given block
devServer.app.post('/api/bullet/create', function(req, res) {
  dbSchema.Bullet.create({
    bullet: req.body.bullet,
    bulletPosition: req.body.bulletPosition
  }).then(function(bullet) {
      dbSchema.User.findOne({
        where: {
          userName: req.body.userName
        }
    }).then(function(user) {
        dbSchema.Resume.findOne({
          where: {
            theme: req.body.title
          }
      }).then(function(resume) {
          dbSchema.Block.findOne({
              where: {
                jobTitle: req.body.jobTitle
              }
          }).then(function(block) {
          block.addBullet(bullet);
          res.send('successfully added bullet: ', bullet);
        });
      });
    });
  });
});

//Retrieve a Users bullets with given userName
devServer.app.post('/api/bullet/get', function(req, res){
  dbSchema.Bullet.findAll({
    //where: { archived: req.body.archived }
    include: [{
      model: dbSchema.Block,
      include: [{
        model: dbSchema.Resume,
        include: [{
          model: dbSchema.User,
          where: {
            userName: req.body.userName
          }
        }]
      }]
    }]
  }).then(function(bullets) {
     //bullets = _.map(bullets, function(item){ return item.bullets; });
     res.send('successfully retrieved bullets: ', bullets);
  });
});