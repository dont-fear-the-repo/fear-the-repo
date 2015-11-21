//QUERY : RETRIEVE A NEW BULLET FOR GIVEN USER->RESUME->BLOCKS-BULLETS

app.post("?"
    //***TODO ADD route*** HAVE TO USE POST OF SEND INFORMATION ABOUT USER INSIDE QUERY
    ,
    function(req, res) {
      User.findOne({
        where: {
          user_name: //***TODO ADD req.session.user.user_name***
        }
      }).then(function(user) {
          var id_users = user.id;
          Resume.findOne({
            where: {
              key: //***TODO ADD req.body.resume***
                id_users: id_users
            }
          }).then(function(resume) {
              resume.getBlocks().then(funciton(block) {
                block.getBullets()
              })
              //TODO TIE IN HOW TO GET ALL BULLETS BACK OUT
              //REPLICATE TO INSERT RECORDS
              // Block.create( //***TODO ADD req.body.block*** )
              //   .then(function(block) {
              //     resume.addBlock(block);
              //     res.status(201).send("succesfully added block");
              //   });
              // });
          });
      });

///QUERY : INSERT A NEW BULLET FOR GIVEN USER->RESUME->BLOCKS-BULLETS

///QUERY : INSERT A NEW BLOCK FOR RESUME
app.post("?"
    //***TODO ADD route*** HAVE TO USE POST OF SEND INFORMATION ABOUT USER INSIDE QUERY
    ,
    function(req, res) {
      User.findOne({
        where: {
          user_name: //***TODO ADD req.session.user.user_name***
        }
      }).then(function(user) {
          var id_users = user.id;
          Resume.findOne({
            where: {
              key: //***TODO ADD req.body.resume***
                id_users: id_users
            }
          }).then(function(resume) {
              Block.create( //***TODO ADD req.body.block*** )
                .then(function(block) {
                  resume.addBlock(block);
                  res.status(201).send("succesfully added block");
                });
              });
          });
      });