import express from 'express';

// initializations
const app = express();

// settings
app.set('port', process.env.PORT || 3000);
// middlewares

// routes

// starting the server
app.listen(app.get('port'), () => {
	console.log(`app listening on port ${app.get('port')}`);
});