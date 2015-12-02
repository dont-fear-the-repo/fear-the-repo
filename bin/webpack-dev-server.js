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
const bcrypt = require('bcrypt-nodejs')
const Promise = require("bluebird");
console.log(bcrypt.compare);
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
  resave: false,
  saveUninitialized: true
}));

devServer.app.post('/authentication', utils.checkUser);
//Login in
devServer.app.post('/login', function (req, res) {
  console.log("On my way");
  dbSchema.User.findOne({
      where: {
        userName: req.body.username,
      }
    })
    .then(function (results) {
      if (results) {
        bcrypt.compare(req.body.password, results.password, function (err, success) {
          if (success) {
            utils.createSession(req, res, results);
          } else {
            res.sendStatus(404);
          }
        })
      } else {
        res.sendStatus(404);
      }
    })
});
//Signup
devServer.app.post('/signup', function (req, res) {
  dbSchema.User.findOne({
      where: {
        userName: req.body.username
      }
    })
    .then(function (results) {
      if (!results) {
        var hashing = Promise.promisify(bcrypt.hash);
        hashing(req.body.password, null, null)
          .then(function (hash) {
            dbSchema.User.create({
              userName: req.body.username,
              password: hash
            })
          }).then(function (results) {
            utils.createSession(req, res, results);
          })
      } else {
        res.sendStatus(404);
      }
    })
});

//logout
devServer.app.post('/logout',function (req, res) {
    req.session.destroy(function(err) {
    if (err) {
      console.error(err);
      res.status(201).send("unable to logout user")
    } else {
      console.log("logout success");
      res.status(200).send("logout success");
    }
  });
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
*/


/*
TODO: make these work!
// Make me a resume
devServer.app.post('/api/makemearesume', function(req, res) {
  // TODO: call this funciton when making a new user
  // user logs in for first time, we immediately call this API endpoint to assign them a new resume
  // that resume is born with a block, and all blocks are born with a bullet

  // users can also call this function to add a resume, so if they already have one, we'll ask sequelize to auto-insert one

  // RETURNS the new resume's unique sequelize ID, and also the block and bullet_id
  // ...and something stores it on the state, next to the userName

  // this whole effort is so that when they load ResumeView, we can ask the state for this resume info to display.
})


// Save Bullets
devServer.app.post('/api/savebulletsonresume', function(req, res) {
  // we have the userName and the RESUME_ID, and the BLOCK_ID, and the BULLET_ID
  // .... if the user adds BLOCKS and BULLETS, then we'll ship those back to the server here
  // and update the view.

})
*/

// Find a user
devServer.app.post('/api/findauser', function(req, res) {
  console.log("You looked for userId: " + req.body.id)
  dbSchema.User.findOne({
      where: {
        id: req.body.id
      }
    })
    .then(function (results) {
      res.send(results.dataValues);
    })
})

// All users please
devServer.app.post('/api/allusers', function (req, res) {
  dbSchema.User.findAll()
    .then(function(results) {
      // var userList = results.map(function(user){return "id: "+ user.id + " email: " + user.email});
      res.send(results);
    })
})

// Create a User
devServer.app.post('/api/userinfo', function(req, res) {
  console.log("I see users! ", req.body.email)
  dbSchema.User.create({
    email: req.body.email,
    password: req.body.password,
    // firstName: req.body.firstName,
    // lastName: req.body.lastName,
    // headline: req.body.headline,
    // industry: req.body.industry,
    // country: req.body.country,
    city: req.body.city,
    // zipCode: req.body.zipCode,
    // phoneNumber: req.body.phoneNumber,
    // facebookURL: req.body.facebookURL,
    // linkedInURL: req.body.linkedInURL,
    // homepageURL: req.body.homepageURL,
    // blogURL: req.body.blogURL,
    // githubURL: req.body.githubURL,
    // behanceURL: req.body.behanceURL,
    // web1Title: req.body.web1Title,
    // web1URL: req.body.web1URL,
    // web2Title: req.body.web2Title,
    // web2URL: req.body.web2URL,
    // pictureUrl: req.body.pictureUrl,
    // positions: req.body.positions,
    // summary: req.body.summary
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
          email: req.body.email
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
        email: req.body.email
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
          email: req.body.email
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

// temp end point, for testing front-to-back data. Sujay will replace.
devServer.app.post('/api/resumeheader', function(req, res) {
  console.log("Hello, this is dog!");
  console.log(req.body)
  res.send(req.body);
});
