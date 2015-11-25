# Heroku Postgres Database Notes #

### ? DB will not connect ###
You need a localPWD.js in the root of your repo.
If you do not have a copy of localPWD.js, just ask the group.
Please do NOT let localPWD.js get uploaded to github! It has API keys.



### Talking to the Database ###
1. Get localPWD.js from group

2. Install heroku commandline toolbelt:
  * https://toolbelt.heroku.com/
  * `heroku login` using the group credentials from slack #googledocs

3. Install postgres:
    * `http://postgresapp.com/documentation/cli-tools.html`
    * `http://postgresapp.com/`


4. Once you have installed psql and edited your path so that you can use the CLI
   * `heroku pg:psql --app tito-test`


### Misc postgres commands ###
* Insert a new user:
  `INSERT INTO "Users" ("id","userName","password","email","firstName","lastName","headline","updatedAt","createdAt") VALUES (DEFAULT,'q','q','q@q.q','alalala','lalala','lalala','2015-11-24 04:24:22.914 +00:00','2015-11-24 04:24:22.914 +00:00') RETURNING *;`

* Show me the users, pretty view
  `select id,"userName","password","email","firstName" from "Users";`
* For removing all tables
 1. `drop schema public cascade;`
 2. `create schema public;`

  * Alternative to above: use `db.sync({force: true})` somewhere in your function, **bad idea in production**
  * http://docs.sequelizejs.com/en/latest/docs/models-definition/#database-synchronization


 * list all tables:
   * `\dt;`

   * same as this long version
     * `select table_schema, table_name from information_schema.tables where table_schema = 'public';`


 * show a table's columns:
   `\d <table name>;`

 * show contents of a table
     `SELECT * from <table name>;`


 * demo user insert:
      ` INSERT INTO "Users" VALUES (DEFAULT, '', '');`
 * quit
    * `\quit`

 * halp!
     * `\help`

<!--
Stuff that used to be stored in dbSchema.js, removed to prevent confusion. But worth keeping for now, please.

// db.sync({force: true});

/*

THESE FUNCTIONS ARE NOT BEING USED.
Look in /bin/webpack-dev-server.js for all the database methods.


'buildATestUser' below is a test function which:
 * builds the Sequelize models
 * builds/clears the database tables
 * and builds our first and only user.
 * It also imports and uses Sequlize and the DB connection.
 ! It will not work without a localPWD.js in the root of your repo.
*/
export function buildATestUser(name) {
  console.log("buildATestUser() was called.")
  db.sync({
    force: true
  }).then(function() {
    return User.create({
      userName: name,
      password: name,
      email: name + '@' + name + '.com',
      firstName: 'Optimism Kitten',
      lastName: 'Courage Wolf',
      headline: '#twoboosters'
    }).then(function(testUser) {
      console.log('\nHere is the test user you just made! :) \nIt was created by buildATestUser() in database/dbSchema.js\n')
      console.log(testUser.get({
        plain: true
      }));
    });
  });
  return {
    User: User
  }
}
buildATestUser('chrisrhoton')
// export function findAUser(id) {
//   console.log("findAUser("+ id +") was called.")
//   User.findOne({
//       where: {
//         id: id
//       }
//     })
//     .then(function(results) {
//       console.log(results.dataValues);
//       return results;
//     })
// }


/*

function utilityToBuildGenericUser(foobar) {
  return ({
    userName: foobar,
    password: foobar,
    email: foobar,
    firstName: foobar,
    lastName: foobar,
    headline: foobar,
    industry: foobar,
    country: foobar,
    city: foobar,
    zipCode: foobar,
    phoneNumber: foobar,
    facebookURL: foobar,
    linkedInURL: foobar,
    homepageURL: foobar,
    blogURL: foobar,
    githubURL: foobar,
    behanceURL: foobar,
    web1Title: foobar,
    web1URL: foobar,
    web2Title: foobar,
    web2URL: foobar,
    pictureUrl: foobar,
    positions: foobar,
    summary: foobar
  })
}


*/




 -->
