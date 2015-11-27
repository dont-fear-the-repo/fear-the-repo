import Sequelize from 'sequelize'; // add Sequelize library for tools
import db from './dbConfig.js'; // connect to database


////////////////////////////////////////////////////////
//   Build some ORM models to talk to our database!   //
//   see 'import Sequelize' and 'import db' at top.   //
////////////////////////////////////////////////////////

export const User = db.define('User', {
  userName: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  headline: Sequelize.TEXT,
  industry: Sequelize.STRING,
  country: Sequelize.STRING,
  city: Sequelize.STRING,
  zipCode: Sequelize.INTEGER,
  phoneNumber: Sequelize.INTEGER,
  facebookURL: Sequelize.STRING,
  linkedInURL: Sequelize.STRING,
  homepageURL: Sequelize.STRING,
  blogURL: Sequelize.STRING,
  githubURL: Sequelize.STRING,
  behanceURL: Sequelize.STRING,
  web1Title: Sequelize.STRING,
  web1URL: Sequelize.STRING,
  web2Title: Sequelize.STRING,
  web2URL: Sequelize.STRING,
  pictureUrl: Sequelize.STRING,
  positions: Sequelize.JSON,
  summary: Sequelize.TEXT,
});




export const Resume = db.define('Resume', {
  theme: Sequelize.TEXT
});

export const Block = db.define('Block', {
  jobTitle: Sequelize.STRING,
  startDate: Sequelize.DATE,
  endDate: Sequelize.DATE
});

export const Bullet = db.define('Bullet', {
  archived: Sequelize.STRING.BINARY
});

export const Employer = db.define('Employer', {
  companyName: Sequelize.STRING,
  industry: Sequelize.STRING,
  country: Sequelize.STRING,
  city: Sequelize.STRING,
  zipCode: Sequelize.INTEGER,
  phoneNumber: Sequelize.INTEGER,
  jobPostingUrl: Sequelize.STRING
});


// set up foreign keys
User.hasMany(Resume, {
  as: 'user_id'
});

Block.hasMany(Bullet, {
  as: 'block_id'
});

Employer.hasMany(Block, {
  as: 'employer_id'
});

Resume.belongsToMany(Block, {
  through: 'resume_to_block'
});
Block.belongsToMany(Resume, {
  through: 'resume_to_block'
});





console.log('database/dbSchema.js was run.')
