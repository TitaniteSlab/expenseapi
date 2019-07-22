import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import User from '../models/user.js';
import { checkPassword } from '../util/encryption.js';

export default passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, function(email, password, done) {
	User.findOne({
		email: email
	})
	.lean()
	.then(user => {
		if (!user) {
			return done(null, false, {
				message: 'Incorrect email address.'
			});
		}
		checkPassword(password, user.password)
		.then(result => {
			if (result) {
				return done(null, user);
			} else {
				done(null, false, {
					message: 'Incorrect password.'
				});
			}
		})
		.catch(err => {
			done(err);
		});
	})
	.catch(err => {
		done(err);
	});
}));

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

