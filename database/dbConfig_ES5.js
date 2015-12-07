// establish Sequelize database connection to heroku postgres
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var envDatabaseVar = undefined;
var db = undefined;

try {
  // see if running local on a dev environment
  // if you do not have a copy of localPWD.js, ask the group
  // Please do NOT let localPWD.js get uploaded to github! It has API keys.
  console.log('Connecting to postgres using localPWD.js from local repo.');
  envDatabaseVar = require('../localPWD_ES5.js');
} catch (err) {
  // must be in deployment, look for heroku ENV_VAR DATABASE_URL
  console.log('Connecting to postgres using ENV_VAR from heroku.');
  envDatabaseVar = {
    url: process.env.DATABASE_URL
  };
}

db = new _sequelize2['default'](envDatabaseVar.url, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
});

console.log('database/dbConfig was run.');
exports['default'] = db;
module.exports = exports['default'];