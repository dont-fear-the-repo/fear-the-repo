// // establish Sequelize database connection to heroku postgres
// import Sequelize from 'sequelize';

// let envDatabaseVar;
// let db;

// try {
//   // see if running local on a dev environment
//   // if you do not have a copy of localPWD.js, ask the group
//   // Please do NOT let localPWD.js get uploaded to github! It has API keys.
//   console.log('Connecting to postgres using localPWD.js from local repo.');
//   envDatabaseVar = require('../localPWD.js');
// } catch (err) {
//   // must be in deployment, look for heroku ENV_VAR DATABASE_URL
//   console.log('Connecting to postgres using ENV_VAR from heroku.');
//   envDatabaseVar = {
//     url: process.env.DATABASE_URL,
//   };
// }

// db = new Sequelize(envDatabaseVar.url, {
//   dialect: 'postgres',
//   dialectOptions: {
//     ssl: true,
//   }
// });

// console.log('database/dbConfig was run.');
// export default db;
