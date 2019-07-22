import { ObjectID } from 'mongodb';
import passport from 'passport';

import wrapAsync from '../util/wrapAsync.js';
import { encryptPassword } from '../util/encryption.js';
import User from '../models/user.js';

export default {
	post: [passport.authenticate('headerapikey'), wrapAsync(async (req, res) => {
		if (req.user.admin !== true) {
			return res.status(401).end();
		}
		let _id = new ObjectID().toHexString();
        let encryptedPassword = await encryptPassword(req.body.password);
		await User.create({
			_id: _id,
			created: new Date(),
			email: req.body.email,
			password: encryptedPassword
		});
		res.status(201).json({
			_id: _id
		});
	})]
};
