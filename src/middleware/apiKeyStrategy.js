import passport from 'passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

import User from '../models/user.js';

passport.use(new HeaderAPIKeyStrategy({
    header: 'Authorization', 
    prefix: 'Bearer '
},
false,
function(apiKey, done) {
    User.findOne({
        api_key: apiKey
    })
    .lean()
    .then(user => {
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    })
    .catch(err => {
        done(err);
    })
}));