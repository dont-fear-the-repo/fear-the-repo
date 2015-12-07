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
Sequelize.query(
'SELECT
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
"Users" u INNER JOIN "Resumes" res ON u.id = res."UserId"
INNER JOIN  resume_to_block rb ON res.id = rb."ResumeId"
INNER JOIN "Blocks" blk ON rb."BlockId" = blk.id
INNER JOIN "Bullets" bul ON blk.id = bul."BlockId"
WHERE u.id = ?
AND res.id = ?'
{replacements: [req.body.UserId, req.body.ResumeId], type: Sequelize.QueryTypes.SELECT}
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
