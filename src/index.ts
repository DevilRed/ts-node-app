// https://www.youtube.com/watch?v=UipIQ81kabs
// 55.50

import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
// importing routes
import IndexRoutes from './routes';


// initializations
const app = express();

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
// set xonfig for handlebars in express
app.engine('.hbs', exphbs({
	extname: '.hbs',
	layoutsDir: path.join(app.get('views'), 'layouts'),
	partialsDir: path.join(app.get('views'), 'partials'),
  helpers: require('./lib/helpers'),
  defaultLayout: 'main'
}));
// use handlebars config
app.set('view engine', '.hbs');

// middlewares
app.use(express.json());// enable json in express server
app.use(express.urlencoded({extended: false}));// enable data from html form
// app.

// routes
// using this way /books is going to be the prefix for all routes
// in IndexRoutes, ie: /books/add,  /books
app.use('/books', IndexRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
	console.log(`app listening on port ${app.get('port')}`);
});
