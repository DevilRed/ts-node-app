// https://www.youtube.com/watch?v=UipIQ81kabs
// 55.50
// shelljs used to execute shell commands from code
// https://developer.okta.com/blog/2018/11/15/node-express-typescript     check best practices

import dotenv from 'dotenv';
import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
// importing routes
import IndexRoutes from './routes';
import BooksRoutes from './routes/books';


// initializations
dotenv.config();
const app = express();
import('./database');

// settings
const port = process.env.SERVER_PORT;
app.set('port', port || 3000);
app.set('views', path.join(__dirname, 'views'));
// set xonfig for handlebars in express
app.engine('.hbs', exphbs({
  extname: '.hbs',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  helpers: require('./lib/helpers'),
  defaultLayout: 'main',
}));
// use handlebars config
app.set('view engine', '.hbs');

// middlewares
app.use(express.json()); // enable json in express server
app.use(express.urlencoded({extended: false})); // enable data from html form
// app.

// routes
// using this way /books is going to be the prefix for all routes
// in IndexRoutes, ie: /books/add,  /books
app.use('/', IndexRoutes);
app.use('/books', BooksRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
  // tslint:disable-next-line:no-console
  console.log(`app listening on port ${app.get('port')}`);
});
