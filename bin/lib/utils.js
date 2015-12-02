function isLoggedIn(req) {
  return req.session ? !!req.session.user : false;
};

export function checkUser(req, res, next) {
  if (!isLoggedIn(req)) {
    res.send({Auth: false});
  } else {
    res.send({Auth: true});
  }
};

export function createSession(req, res, newUser) {
  return req.session.regenerate( () => {
      req.session.user = newUser;
      console.log("i'm in create session")
      res.send();
    });
};
