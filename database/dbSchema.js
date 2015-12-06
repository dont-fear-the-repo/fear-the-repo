import Sequelize from 'sequelize'; // add Sequelize library for tools
import db from './dbConfig.js'; // connect to database

////////////////////////////////////////////////////////
//   Build some ORM models to talk to our database!   //
//   see 'import Sequelize' and 'import db' at top.   //
////////////////////////////////////////////////////////

export const User = db.define('User', {
  email: Sequelize.STRING,
  password: Sequelize.STRING
});

export const Resume = db.define('Resume', {
  name: Sequelize.STRING,
  profession: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  displayEmail: Sequelize.STRING,
  phone: Sequelize.INTEGER,
  webLinkedin: Sequelize.STRING,
  webOther: Sequelize.STRING,
  resumeTitle: Sequelize.STRING,
  resumeTheme: Sequelize.STRING,
  personalStatement: Sequelize.STRING,
  school1Name: Sequelize.STRING,
  school1Degree: Sequelize.STRING,
  school1EndYear: Sequelize.STRING,
  school1Location: Sequelize.STRING,
  school2Name: Sequelize.STRING,
  school2Degree: Sequelize.STRING,
  school2EndYear: Sequelize.STRING,
  school2Location: Sequelize.STRING
});

export const Block = db.define('Block', {
  jobTitle: Sequelize.STRING,
  blockPosition: Sequelize.INTEGER,
  years: Sequelize.STRING,
  companyName: Sequelize.STRING,
  location: Sequelize.STRING
});

export const Bullet = db.define('Bullet', {
  bullet: Sequelize.STRING,
  bulletPosition: Sequelize.INTEGER,
  archived: {type : Sequelize.STRING, defaultValue: 'False'}
});

// set up foreign keys

User.hasMany(Resume, {onDelete: 'cascade'});
Resume.hasMany(Block, {onDelete: 'cascade'});
Block.hasMany(Bullet, {onDelete: 'cascade'});

// Resume.belongsToMany(Block, {
//   through: 'resume_to_block',
//   onDelete: 'cascade'
// });
// Block.belongsToMany(Resume, {
//   through: 'resume_to_block',
//   onDelete: 'cascade'
// });

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

export function buildATestUser() {
  db.sync({
    force: true
  })
  .then(function() {
    return User.create({
      email: 'batman@gmail.com',
      password: 'anarchy'
    }).then(function(testUser) {
      console.log('\nHere is the test user you just made! :) \nIt was created by buildATestUser() in database/dbSchema.js\n')
      console.log(testUser.get({
        plain: true
      }));
    });
  });
  return {
    User : User
  }
}

buildATestUser();

console.log('database/dbSchema.js was run.')
