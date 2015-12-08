
/////////////////////////////////////////////////////////////////////
//   This server is here for when we need it in deployment.        //
//   please run 'npm start' instead of 'nodemon server/server.js'  //
/////////////////////////////////////////////////////////////////////


// var dbSchema = require('../database/dbSchema.js'); // set up database schema
var dbSchema = require('../database/dbSchema_ES5');
var parser = require('body-parser');
var session = require('express-session');
var utils = require('../bin/lib/utils_ES5');
var bcrypt = require('bcrypt-nodejs')

var Promise = require("bluebird");
var bcrypt = require('bcrypt-nodejs')
var pdf = require('html-pdf');
var express = require('express');
var app = express();

app.use(session({
  secret: "Backend if fun because I don't have to deal with react",
  resave: false,
  saveUninitialized: true  
}));

 app.use(express.static(__dirname.slice(0, -6) + 'dist'));

app.use(parser.json());

app.post('/authentication', utils.checkUser);

//Login in
app.post('/login', function (req, res) {
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
            res.status(401).send({error: 'incorrect password'});
          }
        })
      } else {
        res.status(401).send({error: 'user not found'});
      }
    })
});

app.post('/signup', function (req, res) {
  dbSchema.User.findOne({
      where: {
        email: req.body.email
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

app.post('/logout',function (req, res) {
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



// Find a user
app.post('/api/findauser', function (req, res) {
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
app.post('/api/allusers', function (req, res) {
  dbSchema.User.findAll()
    .then(function (results) {
      var userList = results.map(function (user) {
        return "id: " + user.id + " userName: " + user.userName
      });
      res.send(userList);
    })
})

// Create a User
app.post('/api/userinfo', function (req, res) {
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
app.post('/api/resume/create', function(req, res){
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
app.post('/api/block/create', function(req, res){
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
app.post('/api/bullet/create', function(req, res) {
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

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
 })

