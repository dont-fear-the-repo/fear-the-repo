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
        email: req.body.email,
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
        email: req.body.email //change me to id
      }
    })
    .then(function (results) {
      if (!results) {
        var hashing = Promise.promisify(bcrypt.hash);
        hashing(req.body.password, null, null)
          .then(function (hash) {
            dbSchema.User.create({
              email: req.body.email,
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
  NOTE : To add information to USER table create a new user from web application
  curl -H "Content-Type: application/json" -X POST -d '{"email":"wo@gmail.com", "name":"sujay", "profession":"batman", "title":"test", "city":"gothom"}' http://localhost:3000/api/resume/create
  curl -H "Content-Type: application/json" -X POST -d '{"email":"wo@gmail.com", "title":"test", "jobTitle":"badass", "blockPosition":"2", "startDate":"2014", "endDate":"2015"}' http://localhost:3000/api/block/create

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

////Create resume for given user
devServer.app.post('/api/resume/create', function(req, res){
  dbSchema.Resume.create({
    name: req.body.name,
    profession: req.body.profession,
    city: req.body.city,
    state: req.body.state,
    displayEmail: req.body.displayEmail,
    phone: req.body.phone,
    webLinkedin: req.body.webLinkedin,
    webOther: req.body.webOther,
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
    startYear: req.body.startYear,
    endYear: req.body.endYear,
    companyName: req.body.companyName
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
