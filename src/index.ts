// https://www.youtube.com/watch?v=UipIQ81kabs
// 55.50
// shelljs used to execute shell commands from code
// https://developer.okta.com/blog/2018/11/15/node-express-typescript     check best practices

import dotenv from 'dotenv';
import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';
import serveIndex from 'serve-index'; // for serve directory with express
// importing routes
import IndexRoutes from './routes';
import BooksRoutes from './routes/books';
import UsersRoutes from './routes/users';
import PhotosRoutes from './routes/photos';


// initializations
dotenv.config();
const app = express();
import('./database');
import './config/passport';

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
app.use(session({
  secret: 'mysecretapp',
  resave: true,
  saveUninitialized: true,
}));

// passport has to be after session and before flash
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// global variables
app.use((req, res, next) => {
  // flash is available in "req" object, ie: req.flash()
  // so we set global variables in "res" object that maps to flash
  res.locals.success_msg = req.flash('success_msg');
  // add global error variable for passport
  res.locals.error = req.flash('error');
  // passport saves user who logs in, available in req.user
  res.locals.user = req.user || null;
  next();
});

// routes
// using this way /books is going to be the prefix for all routes
// in IndexRoutes, ie: /books/add,  /books
app.use('/', IndexRoutes);
app.use('/books', BooksRoutes);
app.use('/users', UsersRoutes);
app.use(PhotosRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));
// open directory to public, using serveIndex
app.use('/uploads',
  express.static(path.join(__dirname, '../uploads')),
  serveIndex(path.join(__dirname, '../uploads'), { icons: true }),
);

// starting the server
app.listen(app.get('port'), () => {
  // tslint:disable-next-line:no-console
  console.log(`app listening on port ${app.get('port')}`);
});
