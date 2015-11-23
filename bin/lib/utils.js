var isLoggedIn = function(req) {
  return req.session ? !!req.session.user : false;
};

exports.checkUser = function(req, res, next){
	console.log("I've been called?")
  if (!isLoggedIn(req)) {
  	console.log("I'm hit")
    res.redirect('/login');
  } else {
  	console.log("The secret failed")
    next();
  }
};

exports.createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
      req.session.user = newUser;
      res.redirect('/');
    });
};