"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkUser = checkUser;
exports.createSession = createSession;
function isLoggedIn(req) {
  return req.session ? !!req.session.user : false;
};

function checkUser(req, res, next) {
  if (!isLoggedIn(req)) {
    res.send({ Auth: false });
  } else {
    res.send({ Auth: true });
  }
}

;

function createSession(req, res, newUser) {
  return req.session.regenerate(function () {
    req.session.user = newUser;
    res.send({ id: newUser.id });
  });
}

;