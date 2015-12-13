require('babel/register');
// connect to database
import passport from "passport";
import PassportLinkedin from 'passport-linkedin';
import cookieParser from 'cookie-parser';
const request = require('request');
const LinkedinStrategy =  PassportLinkedin.Strategy
const dbSchema = require('../database/dbSchema.js');
const historyApiFallback = require('connect-history-api-fallback');
const config = require('../config');
const parser = require('body-parser');
const session = require('express-session');
const utils = require('./lib/utils');
const bcrypt = require('bcrypt-nodejs');
const pdf = require('html-pdf');
const Promise = require('bluebird');
const db = require('../database/dbConfig.js');
const _ = require('underscore');
const express = require('express');
const app = express();


// Enable webpack middleware if the application is being
// run in development mode.
app.use(parser.json());

app.use(session({
  secret: "Backend is fun because I don't have to deal with React",
  resave: false,
  saveUninitialized: true
}));


app.use(historyApiFallback({
  verbose : false,
    rewrites: [
    {
      from: '/linkedin',
      to: function(context) {
        return context.parsedUrl.pathname;
      }
    }
  ]
}));

/////////////////////////////////////////////////////////////////
//                                                             //
//  Linkedin Authorization passport                            //
//                                                             //
/////////////////////////////////////////////////////////////////


app.use(passport.initialize());
app.use(cookieParser());
passport.use( new LinkedinStrategy({  // request fields from facebook
  profileFields: ['summary','industry','positions','headline','picture-url','first-name','last-name','email-address','location','public-profile-url'],
  consumerKey: '75wbm6jxhrsauj',
  consumerSecret: 'qz9SGDHb53Hi6tnU',
  callbackURL: '/linkedin'
  //enableProof: false
  },
    (accessToken, refreshToken, profile, done) => {
    setTimeout(() => {
      return done(null, profile);
    },0);
  }
));
passport.serializeUser((user, done) => { // serialization is necessary for persistent sessions
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});
app.get('/linkedin', passport.authenticate('linkedin', { scope: ['r_basicprofile','r_emailaddress'] }), (req,res) => {
  req.session.LinkedinData  = res.req.user._json;
  res.redirect('/returnpage');
  });

app.post('/cookie',function(req,res){
  res.send(req.session.LinkedinData);
})


if (config.env === 'development') {
    const webpack = require('webpack');
    const webpackConfig = require('../build/webpack/development_hot');
    const compiler = webpack(webpackConfig);

    app.use(require('./middleware/webpack-dev')({
        compiler,
        publicPath: webpackConfig.output.publicPath
    }));
    app.use(require('./middleware/webpack-hmr')({
        compiler
    }));
} else {
    app.use(express.static(__dirname.slice(0, -6) + 'dist'));
}
////////////////////////////////////////////////////////////////////////
// TODO: All of this Auth and API will need to be refactored someday  //
// to an external file so that a deployment server can use them       //
////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
//                                                             //
//  THESAURUS application                                      //
//                                                             //
///////////////////////////////////////////////////////////////

app.post('/api/thesaurusQuery', (req,res) => {
//console.log (req.body.word);
  request('http://words.bighugelabs.com/api/2/ecb6566c60b2ee6f4c85013ebfb5e70b/' + req.body.word +'/json', function (error, response, body) {
      if (!error && response.statusCode == 200) {
          res.send(body);
      }else{
        res.sendStatus(404)
      }
    })
})



/////////////////////////////////////////////////////////////////
//                                                             //
//  Authentication for the server, create sessions API         //
//                                                             //
/////////////////////////////////////////////////////////////////

app.post('/authentication', utils.checkUser);

//Login
app.post('/login', (req, res) => {
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
            dbSchema.Resume.findOne({
              where: {
                UserId: results.id
              }
            })
            .then( (resume) => {
                if(resume){
                utils.createSession(req, res, {id : results.id, resumeId: resume.id});
                }
                else{
                utils.createSession(req, res, {id : results.id, resumeId: 'NA'});
                }
            })
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
app.post('/signup', (req, res) => {
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
              utils.createSession(req, res, {id: results.id, resumeId: 'NA'});
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
app.post('/logout', (req, res) => {
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
app.post('/api/resume/get', function(req, res) {
  db.query("SELECT u.id as \"UserId\", res.id as \"resumeId\", blk.id as \"blockId\", bul.id as \"bulletId\", res.name, res.profession, res.city, res.state, res.\"displayEmail\", res.phone, res.\"webLinkedin\", res.\"webOther\", res.\"resumeTitle\", res.\"resumeTheme\", res.\"personalStatement\", res.\"school1Name\", res.\"school1Degree\", res.\"school1EndYear\",res.\"school1Location\", res.\"school2Name\", res.\"school2Degree\", res.\"school2EndYear\", res.\"school2Location\", blk.\"jobTitle\", blk.\"blockPosition\", blk.years, blk.\"companyName\", blk.location, blk.\"blockArchived\", blk.\"blockType\", bul.bullet, bul.\"bulletPosition\", bul.\"bulletArchived\" FROM \"Users\" u LEFT OUTER JOIN \"Resumes\" res ON u.id = res.\"UserId\" LEFT OUTER JOIN \"Blocks\" blk ON res.\"id\" = blk.\"ResumeId\" LEFT OUTER JOIN \"Bullets\" bul ON blk.id = bul.\"BlockId\" WHERE u.id = ?", {
      replacements: [req.body.userID],
      type: db.QueryTypes.SELECT
    })
    .then(function(info) {
      // console.log('userID is:', req.body.userID);

      // console.log('res.body is: ', info);
      // console.log('server response is: ', serverResponseToNewResumeState(info));
      res.send(serverResponseToNewResumeState(info));
    });
});

//Update existing resume a. Delete existing informaiton b. Save new information
//Input : userId, resumeId
// Output : userID, resumeID, blockID


// This saves a resume to the DB.
app.post('/api/resume/update', (req, res) => {
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
          resumeTheme: req.body.resumeTheme
          ////////////////////////////////////////////////////////////////////////
          // Front end refactored to remove functionality for RESUME fields below:
          //
          //personalStatement
          // school1Name
          // school1Degree
          // school1EndYear
          // school1Location
          // school2Name
          // school2Degree
          // school2EndYear
          // school2Location
          //
          //NOTE : These fields are still available for future use in the database
          ////////////////////////////////////////////////////////////////////////

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
                          bullet: bulletArr.text,
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

//Export PDF

app.post('/api/resume/export', function (req, res) {

  var filename = "";
  for (var i = 0; i < 16 ; i++){
    filename += Math.floor(Math.random()*10)
  }
  var fileToSend = __dirname.slice(0,-7) + '/dist/pdf/' + filename + '.pdf'
  pdf.create(req.body.resume).toFile(fileToSend, function(err, resData) {
    res.send(resData);
  });
})


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
      text: bullet.bullet, // best line ever
      archived: bullet.bulletArchived
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
export default app;
