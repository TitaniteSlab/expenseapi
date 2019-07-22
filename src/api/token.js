import passport from 'passport';
import nanoid from 'nanoid';

import wrapAsync from '../util/wrapAsync.js';
import User from '../models/user.js';

export default {
	post: [passport.authenticate('local'), wrapAsync(async (req, res) => {
		let token = nanoid(30);
		await User.updateOne({
			_id: req.user._id
		}, {
			$set: {
				api_key: token
			}
		});
		res.status(201).json({
			token: token
		});
	})]
};