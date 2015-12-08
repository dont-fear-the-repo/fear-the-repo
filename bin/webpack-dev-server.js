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

//Login
devServer.app.post('/login', (req, res) => {
  console.log("On my way");
  dbSchema.User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then((results) => {
      if (results) {
        bcrypt.compare(req.body.password, results.password, (err, success) => {
          if (success) {
            utils.createSession(req, res, results);
          } else {
            res.status(401).send({
              error: 'incorrect password'
            });
          }
        });
      } else {
        res.status(401).send({
          error: 'user not found'
        });
      }
    });
});

//Signup
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

//Logout
devServer.app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(201).send({
        error: 'unable to logout user'
      });
    } else {
      console.log('logout success');
      res.status(200).send({
        error: 'logout success'
      });
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


//Retrieve resume for existing user
//Input : userId
//Output : One complete resume in denormalized structure
devServer.app.post('/api/resume/get', function(req, res) {
  db.query("SELECT u.id as \"UserId\", res.id as \"resumeId\", blk.id as \"blockId\", bul.id as \"bulletId\", res.name, res.profession, res.city, res.state, res.\"displayEmail\", res.phone, res.\"webLinkedin\", res.\"webOther\", res.\"resumeTitle\", res.\"resumeTheme\", res.\"personalStatement\", res.\"school1Name\", res.\"school1Degree\", res.\"school1EndYear\",res.\"school1Location\", res.\"school2Name\", res.\"school2Degree\", res.\"school2EndYear\", res.\"school2Location\", blk.\"jobTitle\", blk.\"blockPosition\", blk.years, blk.\"companyName\", blk.location, blk.\"blockArchived\", blk.\"blockType\", bul.bullet, bul.\"bulletPosition\", bul.\"bulletArchived\" FROM \"Users\" u LEFT OUTER JOIN \"Resumes\" res ON u.id = res.\"UserId\" LEFT OUTER JOIN \"Blocks\" blk ON res.\"id\" = blk.\"ResumeId\" LEFT OUTER JOIN \"Bullets\" bul ON blk.id = bul.\"BlockId\" WHERE u.id = ?", {
      replacements: [req.body.userID],
      type: db.QueryTypes.SELECT
    })
    .then(function(info) {
      console.log('userID is:', req.body.userID);

      console.log('res.body is: ', info);
      console.log('server response is: ', serverResponseToNewResumeState(info));
      res.send(serverResponseToNewResumeState(info));
    });
});

//Update existing resume a. Delete existing informaiton b. Save new information
//Input : userId, resumeId
// Output : userID, resumeID, blockID


// This saves a resume to the DB.
devServer.app.post('/api/resume/update', (req, res) => {
  console.log('userID is:', req.body.userID);
  dbSchema.Resume.destroy({
      where: {
        UserId: req.body.userID
      }
    })
    .then(() => {
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
        .then((resume) => {
          dbSchema.User.findOne({
              where: {
                id: req.body.userID
              }
            })
            .then((user) => {
              user.addResume(resume);
              _.each(req.body.blockChildren, (blockArr) => {
                dbSchema.Block.create({
                    jobTitle: blockArr.jobTitle,
                    blockPosition: _.indexOf(req.body.blockChildren, blockArr),
                    years: blockArr.years,
                    companyName: blockArr.companyName,
                    location: blockArr.location,
                    blockArchived: blockArr.blockArchived,
                    blockType: blockArr.blockType
                  })
                  .then((block) => {
                    resume.addBlock(block);
                    _.each(blockArr.bulletChildren, (bulletArr) => {
                      dbSchema.Bullet.create({
                          bullet: bulletArr.bullet,
                          bulletPosition: _.indexOf(blockArr.bulletChildren, bulletArr),
                          bulletArchived: bulletArr.bulletArchived
                        })
                        .then((bullet) => {
                          block.addBullet(bullet);

                          res.send({
                            text: 'successful save!'
                          });
                        });
                    });
                  });
              });
            });
        });
    });
});

// // Mel Test Endpoint
// // curl -H "Content-Type: application/json" -X POST -d '{"email":"test@gmail.com"}' http://localhost:3000/api/resume/giveMeTestResume
// devServer.app.post('/api/resume/testSave', function(req, res) {
//   console.log('userID is:', req.body.userID)
//   const response = {
//     text: 'successful save!'
//   };
//   res.send(response);
// });


// // Mel Test Endpoint
// // curl -H "Content-Type: application/json" -X POST -d '{"email":"test@gmail.com"}' http://localhost:3000/api/resume/giveMeTestResume
// devServer.app.post('/api/resume/giveMeTestResume', function(req, res) {
//   console.log('userID is:', req.body.userID);
//   console.log('res.body is: ', res.body);
//   console.log('server response is: ', serverResponseToNewResumeState(res.body));

//   res.send(serverResponseToNewResumeState(res.body));
// });



//////////////////////////////////////////////////////////////
//                       Helper functions                   //
//////////////////////////////////////////////////////////////

function serverResponseToNewResumeState(serverResponse) {
  var newResumeState = {};

  if (serverResponse[0]) {
      newResumeState.resumeId = serverResponse[0].resumeId,
      newResumeState.resumeTitle = serverResponse[0].resumeTitle,
      newResumeState.resumeTheme = serverResponse[0].resumeTheme,
      newResumeState.serverIsSaving = 'no',

      newResumeState.resumeHeader = {
        name: serverResponse[0].name,
        profession: serverResponse[0].profession,
        city: serverResponse[0].city,
        state: serverResponse[0].state,
        displayEmail: serverResponse[0].displayEmail,
        phone: serverResponse[0].phone,
        webLinkedin: serverResponse[0].webLinkedin,
        webOther: serverResponse[0].webOther
      },

      newResumeState.resumeFooter = {
        school1: {
          name: serverResponse[0].school1Name,
          degree: serverResponse[0].school1Degree,
          schoolEndYear: serverResponse[0].school1EndYear,
          location: serverResponse[0].school1Location
        },
        school2: {
          name: serverResponse[0].school2Name,
          degree: serverResponse[0].school2Degree,
          schoolEndYear: serverResponse[0].school2EndYear,
          location: serverResponse[0].school2Location
        },
        personalStatement: serverResponse[0].personalStatement
      }
  }

  newResumeState.blockChildrenTempObj = {};
  serverResponse.forEach(function(bullet) {
    // check to see if the block is in the blockChildren OBJ yet.
    if (!newResumeState.blockChildrenTempObj[bullet.blockPosition]) {
      newResumeState.blockChildrenTempObj[bullet.blockPosition] = {
        blockId: bullet.blockId,
        blockType: bullet.blockType,
        companyName: bullet.companyName,
        jobTitle: bullet.jobTitle,
        years: bullet.years,
        location: bullet.location,
        bulletChildrenTempObj: {},
        blockPosition: bullet.blockPosition,
        archived: bullet.blockArchived
      };
    }

    newResumeState.blockChildrenTempObj[bullet.blockPosition].bulletChildrenTempObj[bullet.bulletPosition] = {
      bullet: bullet.bullet, // best line ever
      archived: bullet.archived
    };
  })


  newResumeState.blockChildren = [];

  for (var key in newResumeState.blockChildrenTempObj) {
    newResumeState.blockChildren[key] = newResumeState.blockChildrenTempObj[key]
  }
  delete newResumeState.blockChildrenTempObj;

  newResumeState.blockChildren.forEach(function(blockChild) {
    blockChild.bulletChildren = [];
    for (var key in blockChild.bulletChildrenTempObj) {
      blockChild.bulletChildren[key] = blockChild.bulletChildrenTempObj[key]
    }
    delete blockChild.bulletChildrenTempObj;
  })

  return newResumeState;
};
