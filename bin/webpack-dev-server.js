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
db.query( "SELECT u.id as \"UserId\", res.id as \"ResumeId\", blk.id as \"BlkId\", bul.id as \"BulletId\", res.name, res.profession, res.\"displayEmail\", res.phone, res.\"webLinkedin\", res.\"webOther\", res.\"resumeTitle\", res.\"resumeTheme\", res.\"personalStatement\", res.\"school1Name\", res.\"school1Degree\", res.\"school1EndYear\",res.\"school1Location\", res.\"school2Name\", res.\"school2Degree\", res.\"school2EndYear\", res.\"school2Location\", blk.\"jobTitle\", blk.\"blockPosition\", blk.years, blk.\"companyName\", blk.location, bul.bullet, bul.\"bulletPosition\", bul.archived FROM \"Users\" u LEFT OUTER JOIN \"Resumes\" res ON u.id = res.\"UserId\" LEFT OUTER JOIN \"Blocks\" blk ON res.\"id\" = blk.\"ResumeId\" LEFT OUTER JOIN \"Bullets\" bul ON blk.id = bul.\"BlockId\" WHERE u.id = ?", { replacements: [req.body.userID] , type: db.QueryTypes.SELECT}
).then(function(info){
  console.log(info);
  res.send('success for all info: ', info);
})
})

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
  }).then( () => {
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
              resumeID : resume.id,
              blockID : block.id,
              bulletID : bullet.id });
          });
        });
      });
    });
  });
});

devServer.app.post('/api/resume/update', (req, res) => {
  dbSchema.Resume.destroy({
    where: {
      UserId: req.body.userID
    }
  }).then( () => {
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
              resumeID : resume.id,
              blockID : block.id,
              bulletID : bullet.id });
          });
        });
      });
    });
  });
});