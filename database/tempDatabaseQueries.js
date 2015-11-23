//Retrieve Information

///NOTE : THESE QUERIES DO NOT WORK

app.get("/api/bullets"//this needs to be filled in with proper route
  , function(req, res) {
  User.findOne({
    where: {
      user_name: req.session.user.user_name
    }
  }).then(function(user) {
    user.getResumes().then(function(resumes) {
      resumes = _.map(collections, function(item) {
        return item.collection;
      });
      res.send(collections);
    });
  });


////Insert Information

app.post("/api/collection", function(req, res) {
  User.findOne({
    where: {
      user_name: req.session.user.user_name
    }
  }).then(function(user) {
    var user_id = user.id;
    Collection.findOne({
      where: {
        collection: req.body.collection,
        user_id: user_id
      }
    }).then(function(collection) {
      Book.create(req.body.book)
        .then(function(book) {
          collection.addBook(book);
          res.status(201).send("succesfully added book");
        });
    });
  });
});


//Detele Information

app.post("/api/collection/delete", function(req, res) {
  // NY Times bestsellers arent stored in the database, theyre an
  // an API call (not stored in the DB). If you try to delete a book
  // from the bestsellers collection, the server will crash. This
  // if statement prevents that from happening.
  if (req.body.collection === "bestsellers") {
    console.log("Cant delete from bestsellers");
    return;
  }
  User.findOne({
    where: {
      user_name: req.session.user.user_name
    }
  }).then(function(user) {
    var user_id = user.id;
    Collection.findOne({
      where: {
        collection: req.body.collection,
        user_id: user_id
      }
    }).then(function(collection) {
      collection.getBooks({
        where: {
          title: req.body.book.title
        }
      }).then(function(books) {
        books[0].destroy().then(function() {
          console.log("successfully deleted book");
          res.send("deleted book");
        })
      });
    });
  });
});