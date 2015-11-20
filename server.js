import path from 'path';
import bodyParser from 'body-parser';
import Express from 'express';

const app = Express();
const httpServer = http.Server(app);
const port = 3000;


app.use(require('serve-static')(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/**
 * Universal Application endpoint
 */
app.get('/', uni.handleRender);


httpServer.listen(port);
