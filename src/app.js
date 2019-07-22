import fs from 'fs';
import path from 'path';
import express from 'express';
import { initialize } from 'express-openapi';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import yaml from 'js-yaml';
import passport from 'passport';

import config from './config.js';
import bootstrapDb from './util/bootstrapDb.js';
import index from './routes/index.js';

import './middleware/apiKeyStrategy.js';
import './middleware/usernamePasswordStrategy.js';

const schema = loadSchema();

// app
let app = express();
app.enable('trust proxy');
app.set('case sensitive routing', true);

const isDev = app.get('env') === 'development';

(async () => {
	try {
		// Connect to mongodb
		await mongoose.connect(`${config.MONGO_ADDRESS}/${config.MONGO_DB}`, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false
		});
		await bootstrapDb();

		console.info('Server startup complete');
	} catch(e) {
		console.error(e);
		console.error(e.stack);
		process.exit(1);
	}
})().catch(e => {
	console.error(e);
	console.error(e.stack);
	process.exit(1);
});

// middleware
app.use(morgan('tiny'));

// api middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

// routes
app.use('/', index);
app.use(express.static(path.join(__dirname, '..', 'public')));
initialize({
	apiDoc: schema,
	app: app,
	docsPath: '/spec',
	paths: path.resolve(__dirname, 'api')
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	console.error(err);
	console.error(err.stack);
	res.locals.message = err.message;
	res.locals.error = isDev ? err : {};
	res.status(err.status || 500).end();
});

function loadSchema() {
	return yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, '..', 'openapi.yml'), 'utf8'));
}

export default app;