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
const Promise = require('bluebird');
const db = require('../database/dbConfig.js');
const _ = require('underscore');

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

//Login In
devServer.app.post('/login', (req, res) => {
  console.log("On my way");
  dbSchema.User.findOne({
      where: {
        email: req.body.email
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

//Sign Up
devServer.app.post('/signup', (req, res) => {
  dbSchema.User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then((results) => {
      if (!results) {
        const hashing = Promise.promisify(bcrypt.hash);
        hashing(req.body.password, null, null)
          .then((hash) => {
            dbSchema.User.create({
              email: req.body.email,
              password: hash
            }).then((results) => {
              utils.createSession(req, res, results);
            })
          })
      } else {
        res.status(401).send({
          error: 'user already exists'
        });
      }
    });
});

//Log Out
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

//Retrieve resume for existing user
//Input : userId
//Output : One complete resume in denormalized structure
devServer.app.post('/api/resume/get', function(req, res) {
db.query( "SELECT u.id as \"UserId\", res.id as \"ResumeId\", blk.id as \"BlkId\", bul.id as \"BulletId\", res.name, res.profession, res.city, res.state, res.\"displayEmail\", res.phone, res.\"webLinkedin\", res.\"webOther\", res.\"resumeTitle\", res.\"resumeTheme\", res.\"personalStatement\", res.\"school1Name\", res.\"school1Degree\", res.\"school1EndYear\",res.\"school1Location\", res.\"school2Name\", res.\"school2Degree\", res.\"school2EndYear\", res.\"school2Location\", blk.\"jobTitle\", blk.\"blockPosition\", blk.years, blk.\"companyName\", blk.location, bul.bullet, bul.\"bulletPosition\", bul.archived FROM \"Users\" u LEFT OUTER JOIN \"Resumes\" res ON u.id = res.\"UserId\" LEFT OUTER JOIN \"Blocks\" blk ON res.\"id\" = blk.\"ResumeId\" LEFT OUTER JOIN \"Bullets\" bul ON blk.id = bul.\"BlockId\" WHERE u.id = ?", { replacements: [req.body.userID] , type: db.QueryTypes.SELECT}
)
  .then(function(info){
    console.log(info);
    res.send('success for all info: ', info);
  });
});

// Create resume for a new user
// Input : userId
// Output : userID, resumeID, blockID
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
        id: req.body.userID
      }
    })
    .then( (user) => {
      user.addResume(resume);
      dbSchema.Block.create({
        jobTitle: req.body.blockChildren[0].jobTitle,
        blockPosition: req.body.blockChildren[0].blockPosition,
        years: req.body.blockChildren[0].years,
        companyName: req.body.blockChildren[0].companyName,
        location: req.body.blockChildren[0].location
      })
      .then( (block) => {
        resume.addBlock(block);
        dbSchema.Bullet.create({
          bullet: req.body.blockChildren[0].bulletChildren[0].bullet,
          bulletPosition: req.body.blockChildren[0].bulletChildren[0].bulletPosition
        }).then( (bullet) => {
          block.addBullet(bullet);
          res.send('successfully added resume. Here is resumeId, blockId, bulletId: ',
          { userID: req.body.userId,
            resumeId : resume.id,
            blockId : block.id,
            bulletId : bullet.id });
        });
      });
    });
  });
});

//Update existing resume a. Delete existing informaiton b. Save new information
//Input : userId, resumeId
// Output : userID, resumeID, blockID

devServer.app.post('/api/resume/update', (req, res) => {
  dbSchema.Resume.destroy({
    where: {
      UserId: req.body.userID
    }
  })
  .then( () => {
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
          id: req.body.userID
        }
      })
      .then( (user) => {
        user.addResume(resume);
        _.each(req.body.blockChildren, (blockArr) => {
            dbSchema.Block.create({
              jobTitle: blockArr.jobTitle,
              blockPosition: _.indexOf(req.body.blockChildren, blockArr),
              years: blockArr.years,
              companyName: blockArr.companyName,
              location: blockArr.location
            })
            .then( (block) => {
              resume.addBlock(block);
              _.each(blockArr.bulletChildren, (bulletArr) => {
                  dbSchema.Bullet.create({
                    bullet: bulletArr.bullet,
                    bulletPosition: _.indexOf(blockArr.bulletChildren, bulletArr),
                    archived: bulletArr.archived
                  })
                  .then( (bullet) => {
                      block.addBullet(bullet);
                      res.send('successfully updated saved resume. Information: ', bullet);
                  })
              })
            })
          })
        })
    // .then( (info) => {
    //     res.send('successfully added resume. Here is resumeId, blockId, bulletId: ',
    //     { userID: req.body.userId,
    //       resumeID : resume.id,
    //       blockID : block.id,
    //       bulletID : bullet.id });
    // });
      })
    })
});

// Mel Test Endpoint
// curl -H "Content-Type: application/json" -X POST -d '{"email":"test@gmail.com"}' http://localhost:3000/api/resume/giveMeTestResume
devServer.app.post('/api/resume/testSave', function(req, res){
console.log('userID is:', req.body.userID)
  const response = {text: 'successful save!'};
  res.send(response);
});


// Mel Test Endpoint
// curl -H "Content-Type: application/json" -X POST -d '{"email":"test@gmail.com"}' http://localhost:3000/api/resume/giveMeTestResume
devServer.app.post('/api/resume/giveMeTestResume', function(req, res){
// console.log('userID is:', req.body.userID)
//   const yourTestResume = {
//     resumeHeader: {
//       name: 'TROLOLROLRO     Full Name',
//       profession: 'TROLOLROLRO     Profession',
//       city: 'TROLOLROLRO     City',
//       state: 'TROLOLROLRO     State',
//       displayEmail: 'TROLOLROLRO     email@email.com',
//       phone: 'TROLOLROLRO     (124) 125-4737',
//       webLinkedin: 'TROLOLROLRO     linkedin.com/myname',
//       webOther: 'TROLOLROLRO     github.com/number23'
//     },
//     blockChildren: [{
//       blockId: 1,
//       companyName: 'TROLOLROLRO     Company Name',
//       jobTitle: 'TROLOLROLRO     Bossman',
//       years: 'TROLOLROLRO     2015',
//       location: 'TROLOLROLRO     San Francisco, CA',
//       bulletChildren: [{
//         bulletId: 1,
//         text: 'TROLOLROLRO     My first bullet'
//       }, {
//         bulletId: 2,
//         text: 'TROLOLROLRO     Then I productionalized everything, like the Bossman that I am.'
//       }]
//     }, {
//       blockId: 2,
//       companyName: 'TROLOLROLRO     Second Corp.',
//       jobTitle: 'TROLOLROLRO     Lackey',
//       years: 'TROLOLROLRO     2014, 2013',
//       location: 'TROLOLROLRO     San Francisco, CA',
//       bulletChildren: [{
//         bulletId: 1,
//         text: 'TROLOLROLRO     I believe in sentences that end with punctuation'
//       }, {
//         bulletId: 2,
//         text: 'TROLOLROLRO     This is an inflexible belief.'
//       }]
//     }, {
//       blockId: 3,
//       companyName: 'TROLOLROLRO     Third Chance',
//       jobTitle: 'TROLOLROLRO     Intern',
//       years: 'TROLOLROLRO     2012-2011',
//       location: 'TROLOLROLRO     San Francisco, CA',
//       bulletChildren: [{
//         bulletId: 1,
//         text: 'TROLOLROLRO     Not a great life here, alas.'
//       }, {
//         bulletId: 2,
//         text: 'TROLOLROLRO     But I played with a lot of paperclips!'
//       }]
//     }],
//     resumeFooter: {
//       school1: {
//         name: 'TROLOLROLRO     School Name',
//         degree: 'TROLOLROLRO     Degree',
//         schoolEndYear: 'TROLOLROLRO     Year',
//         location: 'TROLOLROLRO     City'
//       },
//       school2: {
//         name: 'TROLOLROLRO     School Name',
//         degree: 'TROLOLROLRO     Degree',
//         schoolEndYear: 'TROLOLROLRO     Year',
//         location: 'TROLOLROLRO     City'
//       },
//       personalStatement: 'kittens are great, I love them'
//     }
//   };
//   res.send(yourTestResume);
});
