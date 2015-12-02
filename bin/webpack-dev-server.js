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

devServer.listen(port, host, () => {
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
  secret: "Backend is fun because I don't have to deal with React",
  resave: false,
  saveUninitialized: true
}));

devServer.app.post('/authentication', utils.checkUser);

devServer.app.post('/login', (req, res) => {
  console.log("On my way");
  dbSchema.User.findOne({
      where: {
        email: req.body.email,
      }
    })
    .then( (results) => {
      if (results) {
        bcrypt.compare(req.body.password, results.password, (err, success) => {
          if (success) {
            utils.createSession(req, res, results);
          } else {
            res.status(401).send({error: 'incorrect password'});
          }
        });
      } else {
        res.status(401).send({error: 'user not found'});
      }
    });
});

devServer.app.post('/signup', (req, res) => {
  dbSchema.User.findOne({
      where: {
        email: req.body.email //change me to id
      }
    })
    .then( (results) => {
      if (!results) {
        var hashing = Promise.promisify(bcrypt.hash); // FIXME: ES6 this
        hashing(req.body.password, null, null)
        .then( (hash) => {
          dbSchema.User.create({
            userName: req.body.username,
            password: hash
          });
        })
        .then( (results) => {
          utils.createSession(req, res, results);
        });
      } else {
        res.status(401).send({error: 'user already exists'});
      }
    });
});

devServer.app.post('/logout', (req, res) => {
  req.session.destroy( (err) => {
    if (err) {
      console.error(err);
      res.status(201).send({error: 'unable to logout user'});
    } else {
      console.log('logout success');
      res.status(200).send({error: 'logout success'});
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
  curl -H "Content-Type: application/json" -X POST -d '{"email":"wo@gmail.com", "name":"sujay", "profession":"batman", "resumeTitle":"test", "city":"gothom"}' http://localhost:3000/api/resume/create
  curl -H "Content-Type: application/json" -X POST -d '{"email":"wo@gmail.com", "resumeTitle":"test", "jobTitle":"bossman", "blockPosition":"2", "startDate":"2014", "endDate":"2015"}' http://localhost:3000/api/block/create

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
devServer.app.post('/api/findauser', (req, res) => {
  console.log("You looked for userId: " + req.body.id);
  dbSchema.User.findOne({
    where: {
      id: req.body.id
    }
  })
  .then( (results) => {
    res.send(results.dataValues);
  });
});

// All users please
devServer.app.post('/api/allusers', (req, res) => {
  dbSchema.User.findAll()
  .then( (results) => {
    // const userList = results.map(function(user){return "id: "+ user.id + " email: " + user.email});
    res.send(results);
  });
});

// Create resume for given user
devServer.app.post('/api/resume/create', (req, res) => {
  dbSchema.Resume.create({
    name: req.body.resumeHeader.name,
    profession: req.body.resumeHeader.profession,
    city: req.body.resumeHeader.city,
    state: req.body.resumeHeader.state,
    displayEmail: req.body.resumeHeader.displayEmail,
    phone: req.body.resumeHeader.phone,
    webLinkedin: req.body.resumeHeader.webLinkedin,
    webOther: req.body.resumeHeader.webOther,
    resumeTitle: req.body.resumeTitle,
    resumeTheme: req.body.resumeTheme,
    personalStatement: req.body.resumeFooter.personalStatement,
    school1Name: req.body.resumeFooter.school1.school1Name,
    school1Degree: req.body.resumeFooter.school1.school1Degree,
    school1EndYear: req.body.resumeFooter.school1.school1EndYear,
    school1Location: req.body.resumeFooter.school1.school1Location,
    school2Name: req.body.resumeFooter.school2.school2Name,
    school2Degree: req.body.resumeFooter.school2.school2Degree,
    school2EndYear: req.body.resumeFooter.school2.school2EndYear,
    school2Location: req.body.resumeFooter.school2.school2Location
  })
  .then( (resume) => {
    dbSchema.User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then( (user) => {
      user.addResume(resume);
      res.send('successfully added resume: ', resume);
    });
  });
});

////Create block for given resume
devServer.app.post('/api/block/create', (req, res) => {
  dbSchema.Block.create({
    jobTitle: req.body.jobTitle,
    blockPosition: req.body.blockPosition,
    years: req.body.years,
    companyName: req.body.companyName,
    location: req.body.location
  })
  .then( (block) => {
    dbSchema.User.findOne({
        where: {
          email: req.body.email
        }
    })
    .then( (user) => {
      dbSchema.Resume.findOne({
          where: {
            resumeTitle: req.body.resumeTitle
          }
      })
      .then( (resume) => {
        resume.addBlock(block);
        res.send('successfully added block: ', block);
      });
    });
  });
});

//Create bullets for given block
devServer.app.post('/api/bullet/create', (req, res) => {
  dbSchema.Bullet.create({
    bullet: req.body.bullet,
    bulletPosition: req.body.bulletPosition
  })
  .then( (bullet) => {
    dbSchema.User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then( (user) => {
      dbSchema.Resume.findOne({
        where: {
          theme: req.body.resumeTitle
        }
      })
      .then( (resume) => {
        dbSchema.Block.findOne({
            where: {
              jobTitle: req.body.jobTitle
            }
        })
        .then( (block) => {
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
