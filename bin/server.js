require('babel/register');

const config = require('../config');
const server = require('../server/server');
const debug  = require('debug')('kit:bin:server');
const port = config.server_port;

server.listen(port, function () {
  debug('Server is now running at ' + port + '.');
});
