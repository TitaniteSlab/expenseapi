import { ObjectID } from 'mongodb';
import passport from 'passport';

import wrapAsync from '../util/wrapAsync.js';
import Expense from '../models/expense.js';

export default {
	get: [passport.authenticate('headerapikey'), wrapAsync(async (req, res) => {
		let query = {
			deleted: {$ne: true}
		};
		if (req.user.admin !== true) {
			query.user_id = req.user._id;
		}
		let expenses = await Expense.find(query).sort({modified: -1}).lean();
		res.status(200).json({
			expenses
		});
	})],
	post: [passport.authenticate('headerapikey'), wrapAsync(async (req, res) => {
		let _id = new ObjectID().toHexString();
		let amountInteger = Math.round(req.body.amount * 100);
		await Expense.create({
			_id: _id,
			user_id: req.user._id,
			created: new Date(),
			modified: new Date(),
			description: req.body.description,
			currency: req.body.content,
			amount: amountInteger
		});
		res.status(201).json({
			_id: _id
		});
	})]
};