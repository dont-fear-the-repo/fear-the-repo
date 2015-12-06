/*
12/4 Test Curls:

curl -H "Content-Type: application/json" -X POST -d '{"userId":"1",
"resumeId":"6",
"blockId": "1",
"resumeTitle":"Protector of Life",
"resumeHeader": {"name":"Bruce Wayne"},
"resumeFooter": {
  "personalStatement":"Save Gothom from harm",
  "school1": {"school1Name": "Mansion"},
  "school2": {"schoo2Name": "The Cave"}
  },
"resumeTheme": "Hero",
"blockChildren":
  [{
  "jobTitle":"CEO Evil Corp",
  "years": "2015",
  "location": "Gothom",
  "bulletChildren":
    [{
      "bullet": "Saved 1 million prisoners",
      "bulletPosition": "1"
    }]
  }]
}' http://localhost:3000/api/resume/create

curl -H "Content-Type: application/json" -X POST -d '{"id":"1"}' http://localhost:3000/api/getAllResumes
curl -H "Content-Type: application/json" -X POST -d '{"UserId":"1", "ResumeId":"6"}' http://localhost:3000/api/getAllResumeInfo
*/


////Insert Query 1 : Insert User Info

app.post('/api/userinfo', function(req, res) {
  User.create(
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
  }).then(function(userinfo){
    res.status(201).send('successfully added userinfo');
  });

////Insert Query 2 : Insert resume theme into Resumes table
app.post('/api/resume', function(req, res){
  Resume.create({
    theme: req.body.theme
  }).then(function(resume){
      User.findOne({
        where: {
          userName: req.body.userName
        }
      }).then(function(user){
        user.addResume(resume);
        res.status(201).send('successfully added resume"';
        })
    })
});

//Insert Query 3 : Insert block

app.post('/api/block', function(req, res){
  Block.create({
    jobTitle: req.body.jobTitle,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  }).then(function(block){
    User.findOne({
      where: {
        userName: req.body.userName
      }
    }).then(function(user){
      Resume.findOne({
        where: {
          theme: req.body.theme
        }
      }).then(function(resume){
        resume.addBlock(block);
        res.status(201).send('successfully added block');
      });
    });
  });
});

//Insert Query 4 : Insert bullets into Bullets table

app.post('/api/bullets', function(req, res) {
  Bullet.create({
    bullet: req.body.bullet
  }).then(function(bullet) {
      User.findOne({
        where: {
          userName: req.body.userName
        }
    }).then(function(user) {
        Resume.findOne({
          where: {
            theme: req.body.theme
          }
      }).then(function(resume) {
          Block.findOne({
              where: {
                jobTitle: req.body.theme
              }
            }
          }).then(function(block) {
          block.addBullet(bullet);
          res.status(201).send('successfully added bullet');
        });
      });
    });
  });
});

//Retrieve Query 5 : Retrieve a Users bullets

dbServer.app.post('/api/bullets/get', function(req, res){
  dbSchema.Bullets.findAll({
    include: [{
      model: dbSchema.Block,
      include: [{
        model: dbSchema.Resume,
        include: [{
          model: dbSchema.User,
          where: {
            email: req.body.email;
          }
        }]
      }]
    }]
  }).then(function(bullets) {
     //bullets = _.map(bullets, function(item){ return item.bullets; });
     res.send(bullets);
  });
});

//Update Query 6 : Update a Users bullets

app.post('/api/bullets/archive', function(req, res) {
  User.findOne({
    where: {
      userName: req.body.userName
    }
  }).then(function(user) {
    Resume.findOne({
      where: {
        theme: req.body.theme
      }
    }).then(function(resume) {
      Block.findOne({
        where: {
          jobTitle: req.body.jobTitle
        }
      });
    }).then(function(block) {
      Bullet.update({
        where: {
          bulletPosition: req.body.bulletPosition
        }
      });
      res.status(201).('successfully updated bulletPosition');
    });
  });
});


//Retrieve Query 7 : Retrieve a Users Resumes

dbServer.app.post('/api/getAllResumes', function(req, res){
  dbSchema.Resume.findAll({
    include: [{
      model: dbSchema.User,
      where: {
        email: req.body.email;
      }
    }]
  }).then(function(resume) {
     res.send(resume.resumeTitle);
  });
});


//retrieve resume based on resume id and user id

devServer.app.post('/api/getAllResumeInfo', function(req, res) {
db.query(
"SELECT
res.name,
res.profession,
res.city,
res.state,
res."displayEmail",
res.phone,
res."webLinkedin",
res."webOther",
res."resumeTitle",
res."resumeTheme",
res."personalStatement",
res."school1Name",
res."school1Degree",
res."school1EndYear",
res."school1Location",
res."school2Name",
res."school2Degree",
res."school2EndYear",
res."school2Location",
blk."jobTitle",
blk."blockPosition",
blk.years,
blk."companyName",
blk.location,
bul.bullet,
bul."bulletPosition",
bul.archived
FROM
"Users" u LEFT OUTER JOIN "Resumes" res ON u.id = res."UserId"
INNER JOIN  resume_to_block rb ON res.id = rb."ResumeId"
INNER JOIN "Blocks" blk ON rb."BlockId" = blk.id
LEFT OUTER JOIN "Bullets" bul ON blk.id = bul."BlockId"
WHERE u.id = ?
AND res.id = ?",
{replacements: [req.body.UserId, req.body.ResumeId], type: db.QueryTypes.SELECT}
).then(function(info){
  console.log(info);
  res.send('success for all info: ', info);
})
})


//Retrieve all resume titles for given User

// devServer.app.post('/api/getAllResumes', function(req, res){
//   dbSchema.Resume.findAll({
//     include: [{
//       model: dbSchema.User,
//       where: {
//         email: req.body.email
//       }
//     }]
//   }).then(function(resume) {
//      res.send(resume.resumeTitle);
//   });
// });

//moved from server 12/4
// Find a user
// devServer.app.post('/api/findauser', (req, res) => {
//   console.log("You looked for userId: " + req.body.id);
//   dbSchema.User.findOne({
//     where: {
//       id: req.body.id
//     }
//   })
//   .then( (results) => {
//     res.send(results.dataValues);
//   });
// });

// All users please
// devServer.app.post('/api/allusers', (req, res) => {
//   dbSchema.User.findAll()
//   .then( (results) => {
//     // const userList = results.map(function(user){return "id: "+ user.id + " email: " + user.email});
//     res.send(results);
//   });
// });

//moved from db 12/4
// curl -H "Content-Type: application/json" -X POST -d '{"email":"test@gmail.com"}' http://localhost:3000/api/getAllResumes
//TODO If mutliple resumes titles are required, include ._map in res.send
devServer.app.post('/api/getAllResumes', function(req, res){
  dbSchema.User.findOne({
    where: {
      id: req.body.id
    }
  }).then(function(user) {
    user.getResumes()
    .then(
      function(resume){
        res.send({userId : resume[0].UserId})//, resume[0].id, resume[0].resumeTitle});
    });
  });
});

////Create block for given resume
devServer.app.post('/api/block/create', (req, res) => {
  const lastIndex = req.body.blockChildren.length-1;
  dbSchema.Block.create({
    jobTitle: req.body.blockChildren[lastIndex].jobTitle,
    blockPosition: req.body.blockChildren[lastIndex].blockPosition,
    years: req.body.blockChildren[lastIndex].years,
    companyName: req.body.blockChildren[lastIndex].companyName,
    location: req.body.blockChildren[lastIndex].location
  })
  .then( (block) => {
    dbSchema.User.findOne({
        where: {
          id: req.body.userId
        }
    })
    .then( (user) => {
      dbSchema.Resume.findOne({
          where: {
            id: req.body.resumeId
          }
      })
      .then( (resume) => {
        resume.addBlock(block);
        res.status(200).send('successfully added block. Here is the block.id: ', block.id);
      });
    });
  });
});

//12/4 Moved to Temp

//Create bullets for given block
devServer.app.post('/api/bullet/create', (req, res) => {
  //create bullet for newest block
  // const lastIndexBlock= req.body.blockChildren.length-1;
  // const lastIndexBullet = req.body.blockChildren[lastIndexBlock].bulletChildren.length-1;
  dbSchema.Bullet.create({
    bullet: req.body.blockChildren[0].bulletChildren[0].bullet,
    bulletPosition: req.body.blockChildren[0].bulletChildren[0].bulletPosition
  })
  .then( (bullet) => {
    dbSchema.User.findOne({
      where: {
        id: req.body.userId
      }
    })
    .then( (user) => {
      dbSchema.Resume.findOne({
        where: {
          id: req.body.resumeId
        }
      })
      .then( (resume) => {
        dbSchema.Block.findOne({
            where: {
              id: req.body.blockId
            }
        })
        .then( (block) => {
          block.addBullet(bullet);
          res.status(200).send('successfully added bullet: ', bullet.id);
        });
      });
    });
  });



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
// });


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