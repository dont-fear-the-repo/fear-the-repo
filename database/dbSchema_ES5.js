'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

// add Sequelize library for tools

var _dbConfigJs = require('./dbConfig_ES5.js');

var _dbConfigJs2 = _interopRequireDefault(_dbConfigJs);

// connect to database

////////////////////////////////////////////////////////
//   Build some ORM models to talk to our database!   //
//   see 'import Sequelize' and 'import db' at top.   //
////////////////////////////////////////////////////////

var User = _dbConfigJs2['default'].define('User', {
  email: _sequelize2['default'].STRING,
  password: _sequelize2['default'].STRING
});

exports.User = User;
var Resume = _dbConfigJs2['default'].define('Resume', {
  name: _sequelize2['default'].STRING,
  profession: _sequelize2['default'].STRING,
  city: _sequelize2['default'].STRING,
  state: _sequelize2['default'].STRING,
  displayEmail: _sequelize2['default'].STRING,
  phone: _sequelize2['default'].INTEGER,
  webLinkedin: _sequelize2['default'].STRING,
  webOther: _sequelize2['default'].STRING,
  resumeTitle: _sequelize2['default'].STRING,
  resumeTheme: _sequelize2['default'].STRING,
  personalStatement: _sequelize2['default'].STRING,
  school1Name: _sequelize2['default'].STRING,
  school1Degree: _sequelize2['default'].STRING,
  school1EndYear: _sequelize2['default'].STRING,
  school1Location: _sequelize2['default'].STRING,
  school2Name: _sequelize2['default'].STRING,
  school2Degree: _sequelize2['default'].STRING,
  school2EndYear: _sequelize2['default'].STRING,
  school2Location: _sequelize2['default'].STRING
});

exports.Resume = Resume;
var Block = _dbConfigJs2['default'].define('Block', {
  jobTitle: _sequelize2['default'].STRING,
  blockPosition: _sequelize2['default'].INTEGER,
  years: _sequelize2['default'].STRING,
  companyName: _sequelize2['default'].STRING,
  location: _sequelize2['default'].STRING
});

exports.Block = Block;
var Bullet = _dbConfigJs2['default'].define('Bullet', {
  bullet: _sequelize2['default'].STRING,
  bulletPosition: _sequelize2['default'].INTEGER,
  archived: { type: _sequelize2['default'].STRING, defaultValue: 'N' }
});

exports.Bullet = Bullet;
// set up foreign keys

User.hasMany(Resume);

Block.hasMany(Bullet);

Resume.belongsToMany(Block, {
  through: 'resume_to_block'
});
Block.belongsToMany(Resume, {
  through: 'resume_to_block'
});

/////////////////////////////////////////////////////////////////
//                                                             //
//   Database methods that will be imported into other files   //
//                                                             //
/////////////////////////////////////////////////////////////////

/*
'buildATestUser' below is a test function which:
 * builds the Sequelize models
 * builds/clears the database tables
 * and builds our first and only user.
 * It also imports and uses Sequlize and the DB connection.
 ! It will not work without a localPWD.js in the root of your repo.

 Try calling this function from anywhere!
 It is currently being called only in /bin/webpack-dev-server.js
*/

// export function buildATestUser() {
//   db.sync({
//     force: true
//   })
//   .then(function() {
//     return User.create({
//       email: 'test@gmail.com',
//       password: 'testHASH'
//     }).then(function(testUser) {
//       console.log('\nHere is the test user you just made! :) \nIt was created by buildATestUser() in database/dbSchema.js\n')
//       console.log(testUser.get({
//         plain: true
//       }));
//     });
//   });
//   return {
//     User : User
//   }
// }

// buildATestUser();

console.log('database/dbSchema.js was run.');